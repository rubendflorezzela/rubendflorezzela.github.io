import os
import json
import sys

def test_environment():
    """Prueba el entorno localmente"""
    
    print("🔧 Probando configuración...")
    
    # Verificar Python
    print(f"🐍 Python version: {sys.version}")
    
    # Verificar scholarly
    try:
        from scholarly import scholarly
        print("✅ scholarly importado correctamente")
    except ImportError as e:
        print(f"❌ Error importando scholarly: {e}")
        return False
    
    # Verificar SCHOLAR_ID
    scholar_id = os.environ.get('SCHOLAR_ID')
    if scholar_id:
        print(f"✅ SCHOLAR_ID encontrado: {scholar_id[:5]}...")
    else:
        print("❌ SCHOLAR_ID no está configurado")
        print("   Ejecuta: export SCHOLAR_ID='TU_ID'")
        return False
    
    # Probar conexión
    try:
        search_query = scholarly.search_author_id(scholar_id)
        author = scholarly.fill(search_query)
        print(f"✅ Conexión exitosa: {author.get('name')}")
        print(f"📊 Citas: {author.get('citedby')}")
        return True
    except Exception as e:
        print(f"❌ Error conectando a Google Scholar: {e}")
        return False

if __name__ == "__main__":
    test_environment()
