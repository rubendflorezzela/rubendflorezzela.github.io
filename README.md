# rubendflorezzela.github.io

Personal academic website for **Ruben Dario Florez-Zela**, focused on Human-Centered AI for Intelligent Transportation Systems.

## Google Scholar metrics

The site uses `data/scholar_stats.json` as the single source of truth for citation metrics. `scripts/scholar-metrics.js` loads that file on every page and updates total citations, h-index, i10-index, and per-paper citation badges without duplicating numbers in multiple HTML files.

The workflow `.github/workflows/sync-scholar.yml` runs **weekly on Monday** and can also be triggered manually from **GitHub → Actions → Sync Google Scholar metrics → Run workflow**. If Google Scholar temporarily blocks automated access, the crawler keeps the last valid cache instead of replacing the site with zero/partial metrics.

> Google Scholar does not provide an official public metrics API. The sync therefore uses the `scholarly` package and should be treated as best-effort automation. The embedded fallback values keep the site usable if Scholar blocks a scheduled run.

## Local check

```bash
python google_scholar_crawler/test_local.py
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deployment

GitHub Pages is deployed by `.github/workflows/static.yml` on normal pushes to `main`. The Scholar workflow commits `data/scholar_stats.json` and then deploys Pages **within the same workflow run**. This is intentional: commits pushed by a workflow with the repository `GITHUB_TOKEN` do not trigger a second Pages build.
