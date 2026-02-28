import os
import json
import time
import hashlib
from scholarly import scholarly

def fetch_scholar_stats():
    """Obtiene estadísticas de Google Scholar y las guarda en JSON"""
    
    scholar_id = os.environ.get('Xf8JgfsAAAAJ&hl')
    if not scholar_id:
        print("❌ Error: SCHOLAR_ID no configurado")
        return 1
    
    output_file = 'data/scholar_stats.json'
    
    try:
        print(f"🔍 Buscando perfil con ID: {scholar_id}")
        
        # Configurar timeouts para evitar bloqueos
        scholarly.set_timeout(15)
        scholarly.set_retries(3)
        
        # Buscar autor por ID
        author = scholarly.search_author_id(scholar_id)
        if not author:
            print(f"❌ No se encontró autor con ID: {scholar_id}")
            return 1
            
        author = scholarly.fill(author)
        
        print(f"✅ Autor encontrado: {author.get('name', 'Unknown')}")
        print(f"📊 Citas totales: {author.get('citedby', 0)}")
        
        # Extraer métricas principales
        stats = {
            "metadata": {
                "scholar_id": scholar_id,
                "name": author.get('name', ''),
                "affiliation": author.get('affiliation', ''),
                "last_updated": time.strftime("%Y-%m-%d %H:%M:%S"),
                "total_citations": author.get('citedby', 0),
                "h_index": author.get('hindex', 0),
                "i10_index": author.get('i10index', 0),
                "publication_count": len(author.get('publications', []))
            },
            "papers": {}
        }
        
        # Procesar cada publicación para obtener citas individuales
        print(f"📚 Procesando {len(author['publications'])} publicaciones...")
        
        for i, pub in enumerate(author['publications'][:20]):  # Limitamos a 20 para evitar timeouts
            try:
                # Obtener ID de la publicación
                pub_id = pub.get('author_pub_id') or pub.get('pub_id')
                if not pub_id:
                    print(f"⚠️ Publicación {i+1} sin ID, saltando...")
                    continue
                
                # Rellenar detalles de la publicación
                pub_filled = scholarly.fill(pub)
                
                # Extraer datos relevantes
                bib = pub_filled.get('bib', {})
                stats['papers'][pub_id] = {
                    "title": bib.get('title', ''),
                    "citations": pub_filled.get('num_citations', 0),
                    "year": bib.get('year', ''),
                    "venue": bib.get('venue', ''),
                    "authors": bib.get('author', '')
                }
                
                print(f"  ✅ {i+1}. {bib.get('title', '')[:60]}... → {pub_filled.get('num_citations', 0)} citas")
                
                # Pequeña pausa para evitar rate limiting
                time.sleep(0.5)
                
            except Exception as e:
                print(f"❌ Error procesando publicación {i+1}: {e}")
                continue
        
        # Guardar archivo
        os.makedirs('data', exist_ok=True)
        
        # Verificar si hubo cambios
        new_content = json.dumps(stats, indent=2, ensure_ascii=False)
        
        if os.path.exists(output_file):
            with open(output_file, 'r', encoding='utf-8') as f:
                old_content = f.read()
            old_hash = hashlib.md5(old_content.encode()).hexdigest()
            new_hash = hashlib.md5(new_content.encode()).hexdigest()
            
            if old_hash == new_hash:
                print("📌 No hay cambios en las métricas")
                return 0
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Archivo guardado: {output_file}")
        return 0
        
    except Exception as e:
        print(f"❌ Error general: {e}")
        return 1

if __name__ == "__main__":
    exit(fetch_scholar_stats())
