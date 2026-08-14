import json
from pathlib import Path

path = Path("data/scholar_stats.json")
data = json.loads(path.read_text(encoding="utf-8"))
assert data["metadata"]["scholar_id"] == "Xf8JgfsAAAAJ"
assert int(data["metadata"]["total_citations"]) >= 0
assert isinstance(data.get("papers"), dict)
print("Scholar cache structure: OK")
