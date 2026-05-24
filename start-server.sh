#!/bin/bash

# 🚀 Steam Premium - Quick Start Script
# Execute este script para iniciar o servidor local rapidamente

echo "╔═══════════════════════════════════════════╗"
echo "║  🎮 STEAM PREMIUM - LANDING PAGE          ║"
echo "║  Quick Start Server                       ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# Detectar sistema operacional
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="Linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macOS"
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    OS="Windows"
else
    OS="Unknown"
fi

echo "✓ Sistema detectado: $OS"
echo ""

# Verificar Python
if command -v python3 &> /dev/null; then
    echo "✓ Python 3 encontrado"
    echo ""
    echo "🚀 Iniciando servidor local..."
    echo "📍 Acesse: http://localhost:8000"
    echo "⛔ Para parar o servidor: Ctrl+C"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✓ Python encontrado"
    echo ""
    echo "🚀 Iniciando servidor local..."
    echo "📍 Acesse: http://localhost:8000"
    echo "⛔ Para parar o servidor: Ctrl+C"
    echo ""
    python -m SimpleHTTPServer 8000
elif command -v node &> /dev/null; then
    echo "✓ Node.js encontrado"
    echo ""
    echo "🚀 Iniciando servidor local..."
    echo "📍 Acesse: http://localhost:8080"
    echo "⛔ Para parar o servidor: Ctrl+C"
    echo ""
    npx http-server
else
    echo "❌ Nenhum servidor Python/Node encontrado"
    echo ""
    echo "📖 Opções de alternativa:"
    echo ""
    echo "1. Instale Python 3:"
    echo "   • Ubuntu/Debian: sudo apt-get install python3"
    echo "   • macOS: brew install python3"
    echo "   • Windows: https://www.python.org/downloads/"
    echo ""
    echo "2. Ou abra index.html diretamente no navegador"
    echo ""
    echo "3. Ou veja DEPLOYMENT.md para mais opções"
fi
