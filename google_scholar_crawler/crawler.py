import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

DEFAULT_SCHOLAR_ID = "Xf8JgfsAAAAJ"
OUTPUT = Path("data/scholar_stats.json")
SERPAPI_ENDPOINT = "https://serpapi.com/search.json"


def clean_scholar_id(value: str) -> str:
    """Accept either a bare Scholar ID or a copied Google Scholar URL/query fragment."""
    value = (value or DEFAULT_SCHOLAR_ID).strip()
    value = re.sub(r"^.*[?&]user=", "", value)
    return value.split("&", 1)[0].strip()


def previous_cache():
    if not OUTPUT.exists():
        return None
    try:
        return json.loads(OUTPUT.read_text(encoding="utf-8"))
    except Exception:
        return None


def fetch_serpapi(author_id: str, api_key: str) -> dict:
    params = {
        "engine": "google_scholar_author",
        "author_id": author_id,
        "hl": "en",
        "num": 100,
        "api_key": api_key,
    }
    request = Request(
        f"{SERPAPI_ENDPOINT}?{urlencode(params)}",
        headers={"User-Agent": "rubendflorezzela.github.io-scholar-sync/1.0"},
    )

    try:
        with urlopen(request, timeout=45) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        raise RuntimeError(f"SerpApi HTTP error {exc.code}.") from exc
    except URLError as exc:
        raise RuntimeError(f"SerpApi connection error: {exc.reason}") from exc
    except json.JSONDecodeError as exc:
        raise RuntimeError("SerpApi returned invalid JSON.") from exc

    if payload.get("error"):
        raise RuntimeError(f"SerpApi returned an error: {payload['error']}")

    status = payload.get("search_metadata", {}).get("status")
    if status and status != "Success":
        raise RuntimeError(f"SerpApi search status is {status!r}, not 'Success'.")

    return payload


def metric_from_table(payload: dict, key: str) -> int:
    for row in payload.get("cited_by", {}).get("table", []) or []:
        metric = row.get(key)
        if isinstance(metric, dict) and metric.get("all") is not None:
            return int(metric["all"])
    raise ValueError(f"Missing {key!r} in SerpApi cited_by table.")


def build_stats(payload: dict, scholar_id: str) -> dict:
    author = payload.get("author", {}) or {}
    articles = payload.get("articles", []) or []

    papers = {}
    for i, article in enumerate(articles):
        title = str(article.get("title", "")).strip()
        if not title:
            continue
        citation_id = article.get("citation_id") or f"pub_{i:03d}"
        cited_by = article.get("cited_by", {}) or {}
        papers[str(citation_id)] = {
            "title": title,
            "citations": int(cited_by.get("value", 0) or 0),
            "year": article.get("year", "") or "",
            "venue": article.get("publication", "") or "",
            "authors": article.get("authors", "") or "",
        }

    return {
        "metadata": {
            "scholar_id": scholar_id,
            "name": author.get("name", ""),
            "affiliation": author.get("affiliations", ""),
            "last_updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "source": "google_scholar_via_serpapi",
            "total_citations": metric_from_table(payload, "citations"),
            "h_index": metric_from_table(payload, "h_index"),
            "i10_index": metric_from_table(payload, "i10_index"),
            "publication_count": len(papers),
        },
        "papers": papers,
    }


def validate(stats: dict, previous: dict | None):
    meta = stats.get("metadata", {})
    if "florez" not in str(meta.get("name", "")).lower():
        raise ValueError("Scholar profile name does not match the expected author.")

    total = int(meta.get("total_citations", 0) or 0)
    if total < 0:
        raise ValueError("Invalid negative citation count.")

    if previous:
        old_total = int(previous.get("metadata", {}).get("total_citations", 0) or 0)
        if old_total > 20 and total == 0:
            raise ValueError("Scholar returned zero citations; treating this as an invalid response.")


def comparable(stats: dict) -> dict:
    """Ignore last_updated when deciding whether a new commit is necessary."""
    clone = json.loads(json.dumps(stats))
    clone.get("metadata", {}).pop("last_updated", None)
    return clone


def main():
    scholar_id = clean_scholar_id(os.getenv("SCHOLAR_ID", DEFAULT_SCHOLAR_ID))
    api_key = os.getenv("SERPAPI_KEY", "").strip()
    previous = previous_cache()

    if not api_key:
        raise RuntimeError("SERPAPI_KEY is not configured.")

    print(f"Fetching Google Scholar profile via SerpApi: {scholar_id}")

    try:
        payload = fetch_serpapi(scholar_id, api_key)
        stats = build_stats(payload, scholar_id)
        validate(stats, previous)
    except Exception as exc:
        print(f"ERROR: Scholar sync failed: {type(exc).__name__}: {exc}")
        if previous:
            print("The previous cached metrics were left unchanged.")
        return 1

    if previous and comparable(stats) == comparable(previous):
        meta = stats["metadata"]
        print(
            "Scholar metrics are unchanged: "
            f"{meta['total_citations']} citations, h-index {meta['h_index']}, "
            f"i10-index {meta['i10_index']}, {meta['publication_count']} publications."
        )
        return 0

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(stats, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    meta = stats["metadata"]
    print(
        f"Updated: {meta['total_citations']} citations, h-index {meta['h_index']}, "
        f"i10-index {meta['i10_index']}, {meta['publication_count']} publications."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
