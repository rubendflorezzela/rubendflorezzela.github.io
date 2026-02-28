import os
import json
import time
import hashlib
from scholarly import scholarly

def fetch_scholar_stats():
    """Obtiene estadísticas de Google Scholar y las guarda en JSON"""
    
    print("🚀 Iniciando crawler de Google Scholar...")
    
    scholar_id = os.environ.get('SCHOLAR_ID')
    if not scholar_id:
        print("❌ Error: SCHOLAR_ID no configurado")
        print("   Asegúrate de haber configurado el secret en GitHub:")
        print("   Settings → Secrets and variables → Actions → New repository secret")
        return 1
    
    output_file = 'data/scholar_stats.json'
    
    try:
        print(f"🔍 Buscando perfil con ID: {scholar_id}")
        
        # Configurar timeouts
        scholarly.set_timeout(15)
        scholarly.set_retries(3)
        
        # Buscar autor por ID
        search_query = scholarly.search_author_id(scholar_id)
        if not search_query:
            print(f"❌ No se encontró autor con ID: {scholar_id}")
            print("   Verifica que el ID sea correcto en GitHub Secrets")
            return 1
        
        author = scholarly.fill(search_query)
        
        print(f"✅ Autor encontrado: {author.get('name', 'Unknown')}")
        print(f"🏫 Afiliación: {author.get('affiliation', 'Unknown')}")
        print(f"📊 Citas totales: {author.get('citedby', 0)}")
        print(f"📈 h-index: {author.get('hindex', 0)}")
        print(f"📊 i10-index: {author.get('i10index', 0)}")
        print(f"📚 Publicaciones: {len(author.get('publications', []))}")
        
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
        
        # Procesar publicaciones (solo las primeras 10 para evitar timeouts)
        print(f"📚 Procesando publicaciones...")
        publications = author.get('publications', [])
        
        for i, pub in enumerate(publications[:10]):
            try:
                # Obtener ID único
                pub_id = pub.get('author_pub_id', pub.get('pub_id', f"pub_{i}"))
                
                # Extraer datos básicos sin hacer fill para evitar timeouts
                bib = pub.get('bib', {})
                stats['papers'][pub_id] = {
                    "title": bib.get('title', 'Unknown'),
                    "citations": pub.get('num_citations', 0),
                    "year": bib.get('year', ''),
                    "venue": bib.get('venue', ''),
                    "authors": bib.get('author', '')
                }
                
                print(f"  ✅ {i+1}. {bib.get('title', '')[:50]}... → {pub.get('num_citations', 0)} citas")
                
            except Exception as e:
                print(f"⚠️ Error procesando publicación {i+1}: {e}")
                continue
        
        # Crear directorio data si no existe
        os.makedirs('data', exist_ok=True)
        print(f"📁 Directorio data/ creado/verificado")
        
        # Guardar archivo
        new_content = json.dumps(stats, indent=2, ensure_ascii=False)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Archivo guardado: {output_file}")
        print(f"📊 Contenido: {len(new_content)} caracteres")
        
        # Verificar que el archivo existe
        if os.path.exists(output_file):
            file_size = os.path.getsize(output_file)
            print(f"📁 Verificación: archivo existe, tamaño: {file_size} bytes")
        else:
            print(f"❌ Error: El archivo no se creó correctamente")
            return 1
        
        return 0
        
    except Exception as e:
        print(f"❌ Error general: {type(e).__name__}: {e}")
        import traceback
        traceback.print_exc()
        return 1

if __name__ == "__main__":
    exit(fetch_scholar_stats())
