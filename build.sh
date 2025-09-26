#!/bin/bash

# Script para construir Cubert con archivos embebidos

set -e  # Exit on any error

# Colores
GREEN='\033[32m'
BLUE='\033[34m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'

echo -e "${BLUE}🚀 Cubert Embedded Build Script${RESET}"
echo ""

# Verificar dependencias
echo -e "${YELLOW}📋 Verificando dependencias...${RESET}"

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${RESET}"
    exit 1
fi

# Verificar pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}❌ pnpm no está instalado${RESET}"
    exit 1
fi

# Verificar Go
if ! command -v go &> /dev/null; then
    echo -e "${RED}❌ Go no está instalado${RESET}"
    exit 1
fi

echo -e "${GREEN}✅ Todas las dependencias están disponibles${RESET}"

# Instalar dependencias si es necesario
if [ ! -d "client/node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias del frontend...${RESET}"
    cd client && pnpm install && cd ..
fi

if [ ! -f "backend/go.sum" ]; then
    echo -e "${YELLOW}📦 Descargando dependencias del backend...${RESET}"
    cd backend && go mod download && cd ..
fi

# Limpiar build anterior
echo -e "${YELLOW}🧹 Limpiando builds anteriores...${RESET}"
rm -rf backend/cmd/server/static/*
rm -f releases/cubert-embedded*
mkdir -p backend/cmd/server/static
mkdir -p releases

# Construir frontend
echo -e "${BLUE}🏗️  Construyendo frontend...${RESET}"
cd client
NODE_ENV=production pnpm build
cd ..

# Verificar que los archivos se generaron
if [ ! -f "backend/cmd/server/static/index.html" ]; then
    echo -e "${RED}❌ Error: No se generó index.html${RESET}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend construido exitosamente${RESET}"

# Listar archivos embebidos
echo -e "${BLUE}📄 Archivos que serán embebidos:${RESET}"
find backend/cmd/server/static -type f | head -10
TOTAL_FILES=$(find backend/cmd/server/static -type f | wc -l)
echo -e "${YELLOW}📊 Total de archivos: ${TOTAL_FILES}${RESET}"

# Construir binario embebido
echo -e "${BLUE}🔗 Construyendo binario embebido...${RESET}"
cd backend

# Verificar que los archivos estáticos existen
if [ ! -f "cmd/server/static/index.html" ]; then
    echo -e "${RED}❌ Error: Archivos estáticos no encontrados en cmd/server/static/${RESET}"
    echo -e "${YELLOW}💡 Verificando estructura...${RESET}"
    ls -la cmd/server/static/ || echo "No existe cmd/server/static/"
    exit 1
fi

# Build flags para optimización
if [ "$1" = "--debug" ]; then
    echo -e "${YELLOW}🐛 Modo debug activado${RESET}"
    go build -o ../releases/cubert-embedded cmd/server/main.go
else
    echo -e "${YELLOW}⚡ Optimizando binario...${RESET}"
    go build -ldflags="-w -s" -o ../releases/cubert-embedded cmd/server/main.go
fi

# Verificar tamaño del binario
BINARY_SIZE=$(du -h ../releases/cubert-embedded | cut -f1)
echo -e "${GREEN}✅ Binario generado: releases/cubert-embedded (${BINARY_SIZE})${RESET}"

cd ..

# Opcional: Comprimir binario
if [ "$1" = "--compress" ] || [ "$2" = "--compress" ]; then
    echo -e "${YELLOW}🗜️  Comprimiendo binario con UPX...${RESET}"
    if command -v upx &> /dev/null; then
        upx --best --lzma releases/cubert-embedded
        NEW_SIZE=$(du -h releases/cubert-embedded | cut -f1)
        echo -e "${GREEN}✅ Binario comprimido: ${NEW_SIZE}${RESET}"
    else
        echo -e "${YELLOW}⚠️  UPX no está instalado, saltando compresión${RESET}"
    fi
fi

echo ""
echo -e "${GREEN}🎉 Build embebido completado!${RESET}"
echo ""
echo -e "${BLUE}🚀 Para ejecutar la aplicación embebida:${RESET}"
echo -e "  ${YELLOW}./releases/cubert-embedded${RESET}"
echo ""
echo -e "${BLUE}📦 El binario incluye:${RESET}"
echo -e "  ${YELLOW}✅ Frontend React completo${RESET}"
echo -e "  ${YELLOW}✅ API Go completa${RESET}"
echo -e "  ${YELLOW}✅ Todos los assets (CSS, JS, imágenes)${RESET}"
echo -e "  ${YELLOW}✅ Zero dependencies para deployment${RESET}"
echo ""
echo -e "${BLUE}🌐 La aplicación estará disponible en:${RESET}"
echo -e "  ${YELLOW}🌐 Frontend: http://localhost:8080${RESET}"
echo -e "  ${YELLOW}🔗 API: http://localhost:8080/api${RESET}"
echo -e "  ${YELLOW}📚 Docs: http://localhost:8080/docs${RESET}"
echo ""
echo -e "${GREEN}📋 Deployment: Solo copia el binario 'cubert-embedded' al servidor!${RESET}"