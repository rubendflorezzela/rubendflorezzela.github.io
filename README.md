# rubendflorezzela.github.io

Personal academic website for **Ruben Dario Florez-Zela**, focused on Human-Centered AI for Intelligent Transportation Systems.

## Google Scholar metrics

The site uses `data/scholar_stats.json` as the single source of truth for citation metrics. `scripts/scholar-metrics.js` loads that file on every page and updates total citations, h-index, i10-index, and per-paper citation badges without duplicating numbers in multiple HTML files.

The workflow `.github/workflows/sync-scholar.yml` runs **weekly on Monday at 11:23 UTC (06:23 in Peru)** and can also be triggered manually from **GitHub → Actions → Sync Google Scholar metrics → Run workflow**.

Metrics are retrieved through the **SerpApi Google Scholar Author API**. The private API key is stored only as the GitHub Actions repository secret `SERPAPI_KEY`; it is never committed to the repository or exposed to the public website. If an API request fails or returns invalid data, `data/scholar_stats.json` is left unchanged and the workflow fails visibly instead of publishing partial metrics.

## Local check

```bash
python google_scholar_crawler/test_local.py
python -m http.server 8000
```

Then open `http://localhost:8000/`.

To test the live Scholar fetch locally, set `SERPAPI_KEY` in your shell environment first and then run:

```bash
python google_scholar_crawler/crawler.py
```

## Deployment

GitHub Pages is deployed by `.github/workflows/static.yml` on normal pushes to `main`. The Scholar workflow commits `data/scholar_stats.json` when the metrics change and deploys Pages within the same workflow run.
