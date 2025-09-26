#!/bin/bash

# Script para generar binarios de release multiplataforma

set -e

# Colores
GREEN='\033[32m'
BLUE='\033[34m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'

echo -e "${BLUE}🚀 Cubert Multi-Platform Release Builder${RESET}"
echo ""

# Variables
VERSION=${1:-"v1.0.0"}
RELEASE_DIR="releases"
PLATFORMS=(
    "linux/amd64"
    "linux/arm64"
    "darwin/amd64"
    "darwin/arm64"
    "windows/amd64"
    "windows/arm64"
)

# Limpiar releases anteriores
echo -e "${YELLOW}🧹 Limpiando releases anteriores...${RESET}"
rm -rf "$RELEASE_DIR"/*
mkdir -p "$RELEASE_DIR"

# Construir frontend una sola vez
echo -e "${BLUE}🏗️  Construyendo frontend...${RESET}"
cd client
pnpm build
cd ..

# Verificar que los archivos estáticos existen
if [ ! -f "backend/cmd/server/static/index.html" ]; then
    echo -e "${RED}❌ Error: Archivos estáticos no encontrados${RESET}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend construido exitosamente${RESET}"
echo ""

# Construir para cada plataforma
cd backend

for platform in "${PLATFORMS[@]}"; do
    platform_split=(${platform//\// })
    GOOS=${platform_split[0]}
    GOARCH=${platform_split[1]}
    
    output_name="cubert-${VERSION}-${GOOS}-${GOARCH}"
    
    if [ $GOOS = "windows" ]; then
        output_name+='.exe'
    fi
    
    echo -e "${BLUE}🔨 Construyendo para ${GOOS}/${GOARCH}...${RESET}"
    
    env GOOS=$GOOS GOARCH=$GOARCH go build \
        -ldflags="-w -s -X main.version=${VERSION}" \
        -o "../${RELEASE_DIR}/${output_name}" \
        cmd/server/main.go
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Error construyendo para ${platform}${RESET}"
        continue
    fi
    
    # Mostrar tamaño del binario
    size=$(du -h "../${RELEASE_DIR}/${output_name}" | cut -f1)
    echo -e "${GREEN}✅ ${output_name} (${size})${RESET}"
done

cd ..

# Crear checksums
echo ""
echo -e "${YELLOW}🔐 Generando checksums...${RESET}"
cd "$RELEASE_DIR"
sha256sum cubert-${VERSION}-* > "cubert-${VERSION}-checksums.txt"
cd ..

# Comprimir releases (opcional)
echo ""
echo -e "${YELLOW}📦 Comprimiendo releases...${RESET}"
cd "$RELEASE_DIR"
for file in cubert-${VERSION}-*; do
    if [[ "$file" != *".zip"* ]] && [[ "$file" != *"checksums"* ]]; then
        if [[ "$file" == *".exe"* ]]; then
            # Windows: crear ZIP
            zip "${file%.*}.zip" "$file"
            rm "$file"
        else
            # Unix: crear tar.gz
            tar -czf "${file}.tar.gz" "$file"
            rm "$file"
        fi
    fi
done
cd ..

echo ""
echo -e "${GREEN}🎉 Releases generados exitosamente!${RESET}"
echo ""
echo -e "${BLUE}📦 Archivos generados:${RESET}"
ls -lh "$RELEASE_DIR"/
echo ""
echo -e "${BLUE}🚀 Para crear un GitHub Release:${RESET}"
echo -e "${YELLOW}gh release create ${VERSION} releases/* --title \"Cubert ${VERSION}\" --notes \"Release notes here\"${RESET}"
echo ""
echo -e "${BLUE}📋 O subir manualmente a GitHub:${RESET}"
echo -e "${YELLOW}1. Ve a tu repositorio en GitHub${RESET}"
echo -e "${YELLOW}2. Ve a Releases > Create a new release${RESET}"
echo -e "${YELLOW}3. Tag version: ${VERSION}${RESET}"
echo -e "${YELLOW}4. Sube los archivos de la carpeta releases/${RESET}"