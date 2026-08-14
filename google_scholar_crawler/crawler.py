import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

from scholarly import scholarly

DEFAULT_SCHOLAR_ID = "Xf8JgfsAAAAJ"
OUTPUT = Path("data/scholar_stats.json")


def clean_scholar_id(value: str) -> str:
    """Accept either a bare Scholar ID or a copied query fragment."""
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


def validate(stats, previous):
    meta = stats.get("metadata", {})
    if "florez" not in meta.get("name", "").lower():
        raise ValueError("Scholar profile name does not match the expected author.")

    total = int(meta.get("total_citations", 0) or 0)
    if total < 0:
        raise ValueError("Invalid negative citation count.")

    if previous:
        old_total = int(previous.get("metadata", {}).get("total_citations", 0) or 0)
        # A blocked/partial scrape often returns empty or zero-valued data. Keep the last good cache.
        if old_total > 20 and total == 0:
            raise ValueError("Scholar returned zero citations; treating this as a partial/blocked response.")


def build_stats(author, scholar_id):
    publications = author.get("publications", []) or []
    papers = {}
    for i, pub in enumerate(publications):
        bib = pub.get("bib", {}) or {}
        title = str(bib.get("title", "")).strip()
        if not title:
            continue
        pub_id = pub.get("author_pub_id") or pub.get("pub_id") or f"pub_{i:03d}"
        papers[str(pub_id)] = {
            "title": title,
            "citations": int(pub.get("num_citations", 0) or 0),
            "year": bib.get("pub_year", bib.get("year", "")) or "",
            "venue": bib.get("citation", bib.get("venue", "")) or "",
            "authors": bib.get("author", "") or "",
        }

    return {
        "metadata": {
            "scholar_id": scholar_id,
            "name": author.get("name", ""),
            "affiliation": author.get("affiliation", ""),
            "last_updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "source": "google_scholar_via_scholarly",
            "total_citations": int(author.get("citedby", 0) or 0),
            "h_index": int(author.get("hindex", 0) or 0),
            "i10_index": int(author.get("i10index", 0) or 0),
            "publication_count": len(publications),
        },
        "papers": papers,
    }


def main():
    scholar_id = clean_scholar_id(os.getenv("SCHOLAR_ID", DEFAULT_SCHOLAR_ID))
    previous = previous_cache()
    print(f"Fetching Google Scholar profile: {scholar_id}")

    try:
        scholarly.set_timeout(20)
        scholarly.set_retries(3)
        author_stub = scholarly.search_author_id(scholar_id)
        if not author_stub:
            raise RuntimeError("No author profile returned by Google Scholar.")
        author = scholarly.fill(author_stub)
        stats = build_stats(author, scholar_id)
        validate(stats, previous)
    except Exception as exc:
        print(f"WARNING: Scholar sync could not be completed: {type(exc).__name__}: {exc}")
        if previous:
            print("Keeping the previous cached metrics so the website remains stable.")
            return 0
        raise

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    new_content = json.dumps(stats, indent=2, ensure_ascii=False) + "\n"
    old_content = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else ""
    if new_content == old_content:
        print("Scholar metrics are unchanged.")
        return 0

    OUTPUT.write_text(new_content, encoding="utf-8")
    meta = stats["metadata"]
    print(f"Updated: {meta['total_citations']} citations, h-index {meta['h_index']}, i10-index {meta['i10_index']}, {meta['publication_count']} publications.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
