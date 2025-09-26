#!/bin/bash

# Instalador automático de Cubert
# Descarga y configura la última versión de Cubert

set -e

# Colores
GREEN='\033[32m'
BLUE='\033[34m'
YELLOW='\033[33m'
RED='\033[31m'
RESET='\033[0m'

# Variables
REPO="tuusername/cubert"  # Cambiar por tu usuario/repo
INSTALL_DIR="${HOME}/.local/bin"
BINARY_NAME="cubert"

echo -e "${BLUE}🚀 Instalador de Cubert File Manager${RESET}"
echo ""

# Detectar sistema operativo y arquitectura
OS=$(uname -s | tr '[:upper:]' '[:lower:]')
ARCH=$(uname -m)

case $ARCH in
    x86_64) ARCH="amd64" ;;
    aarch64|arm64) ARCH="arm64" ;;
    *) echo -e "${RED}❌ Arquitectura no soportada: $ARCH${RESET}"; exit 1 ;;
esac

case $OS in
    linux) PLATFORM="linux-${ARCH}" ;;
    darwin) PLATFORM="darwin-${ARCH}" ;;
    *) echo -e "${RED}❌ Sistema operativo no soportado: $OS${RESET}"; exit 1 ;;
esac

echo -e "${YELLOW}📋 Detectado: $OS/$ARCH${RESET}"
echo -e "${YELLOW}🎯 Plataforma objetivo: $PLATFORM${RESET}"

# Crear directorio de instalación
mkdir -p "$INSTALL_DIR"

# Obtener la última versión
echo -e "${BLUE}🔍 Obteniendo información de la última versión...${RESET}"

if command -v curl &> /dev/null; then
    LATEST_VERSION=$(curl -s "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
elif command -v wget &> /dev/null; then
    LATEST_VERSION=$(wget -qO- "https://api.github.com/repos/${REPO}/releases/latest" | grep '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/')
else
    echo -e "${RED}❌ curl o wget requerido para la instalación${RESET}"
    exit 1
fi

if [ -z "$LATEST_VERSION" ]; then
    echo -e "${RED}❌ No se pudo obtener la información de la versión${RESET}"
    exit 1
fi

echo -e "${GREEN}✅ Última versión encontrada: $LATEST_VERSION${RESET}"

# Construir URL de descarga
BINARY_URL="https://github.com/${REPO}/releases/download/${LATEST_VERSION}/cubert-${LATEST_VERSION}-${PLATFORM}"
if [ "$OS" = "windows" ]; then
    BINARY_URL="${BINARY_URL}.exe"
    BINARY_NAME="${BINARY_NAME}.exe"
fi

echo -e "${BLUE}📥 Descargando Cubert...${RESET}"
echo -e "${YELLOW}URL: $BINARY_URL${RESET}"

# Descargar binario
TEMP_FILE="/tmp/cubert-${LATEST_VERSION}"
if command -v curl &> /dev/null; then
    curl -L -o "$TEMP_FILE" "$BINARY_URL"
elif command -v wget &> /dev/null; then
    wget -O "$TEMP_FILE" "$BINARY_URL"
fi

if [ ! -f "$TEMP_FILE" ]; then
    echo -e "${RED}❌ Error al descargar el binario${RESET}"
    exit 1
fi

# Verificar descarga
echo -e "${GREEN}✅ Descarga completada${RESET}"

# Hacer ejecutable y mover a directorio final
chmod +x "$TEMP_FILE"
mv "$TEMP_FILE" "${INSTALL_DIR}/${BINARY_NAME}"

echo -e "${GREEN}✅ Cubert instalado en: ${INSTALL_DIR}/${BINARY_NAME}${RESET}"

# Verificar que está en el PATH
if echo "$PATH" | grep -q "${INSTALL_DIR}"; then
    echo -e "${GREEN}✅ ${INSTALL_DIR} está en tu PATH${RESET}"
else
    echo -e "${YELLOW}⚠️  Agregar ${INSTALL_DIR} a tu PATH:${RESET}"
    echo -e "${BLUE}echo 'export PATH=\"${INSTALL_DIR}:\$PATH\"' >> ~/.bashrc${RESET}"
    echo -e "${BLUE}source ~/.bashrc${RESET}"
fi

# Probar instalación
echo -e "${BLUE}🧪 Probando instalación...${RESET}"

if "${INSTALL_DIR}/${BINARY_NAME}" --version 2>/dev/null || true; then
    echo -e "${GREEN}✅ Instalación exitosa!${RESET}"
else
    echo -e "${YELLOW}⚠️  Binario instalado, pero no se pudo verificar la versión${RESET}"
fi

echo ""
echo -e "${GREEN}🎉 ¡Cubert instalado exitosamente!${RESET}"
echo ""
echo -e "${BLUE}🚀 Para ejecutar:${RESET}"
echo -e "${YELLOW}${INSTALL_DIR}/${BINARY_NAME}${RESET}"
echo ""
echo -e "${BLUE}🌐 La aplicación estará disponible en:${RESET}"
echo -e "${YELLOW}http://localhost:8080${RESET}"
echo ""
echo -e "${BLUE}📚 Para más información:${RESET}"
echo -e "${YELLOW}https://github.com/${REPO}${RESET}"