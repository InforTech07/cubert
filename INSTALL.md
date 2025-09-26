# 📥 Instalación de Cubert

¡Gracias por tu interés en Cubert! Aquí tienes varias formas de instalar y probar la aplicación.

## 🚀 **Opción 1: Binario Precompilado (Recomendado)**

### Descarga desde GitHub Releases

1. **Ve a la [página de releases](https://github.com/tuusername/cubert/releases/latest)**
2. **Descarga el binario para tu sistema operativo:**
   - `cubert-vX.X.X-linux-amd64` - Linux 64-bit
   - `cubert-vX.X.X-linux-arm64` - Linux ARM64  
   - `cubert-vX.X.X-darwin-amd64` - macOS Intel
   - `cubert-vX.X.X-darwin-arm64` - macOS Apple Silicon
   - `cubert-vX.X.X-windows-amd64.exe` - Windows 64-bit

3. **Verificar integridad (opcional):**
   ```bash
   # Descargar también el archivo de checksums
   sha256sum -c cubert-vX.X.X-checksums.txt
   ```

4. **Ejecutar:**
   ```bash
   # Linux/macOS
   chmod +x cubert-vX.X.X-linux-amd64
   ./cubert-vX.X.X-linux-amd64
   
   # Windows
   cubert-vX.X.X-windows-amd64.exe
   ```

### Instalación con script automático

```bash
# Linux/macOS
curl -sSL https://raw.githubusercontent.com/tuusername/cubert/main/install.sh | bash

# O usando wget
wget -qO- https://raw.githubusercontent.com/tuusername/cubert/main/install.sh | bash
```

## 🛠️ **Opción 2: Compilar desde Código Fuente**

### Prerrequisitos
- **Go 1.24+**
- **Node.js 18+** 
- **pnpm**

### Instalación
```bash
# Clonar repositorio
git clone https://github.com/tuusername/cubert.git
cd cubert

# Instalar dependencias
make install

# Compilar aplicación
make build-embedded

# Ejecutar
./releases/cubert-embedded
```

## 🐳 **Opción 3: Docker**

```bash
# Usando docker-compose (recomendado)
curl -O https://raw.githubusercontent.com/tuusername/cubert/main/docker-compose.yml
docker-compose up -d

# O directamente con Docker
docker run -p 8080:8080 -v /tu/directorio:/data cubert:latest
```

## 🔧 **Configuración**

### Variables de Entorno

```bash
# Puerto del servidor (default: 8080)
export PORT=3000

# Directorio de trabajo (default: directorio actual)
export WORKDIR=/path/to/files

# Modo de logging (default: info)
export LOG_LEVEL=debug
```

### Archivo de Configuración

Crea un archivo `.env` en el mismo directorio que el binario:

```bash
PORT=8080
WORKDIR=/home/user/documents
LOG_LEVEL=info
```

## 🌐 **Acceso a la Aplicación**

Una vez ejecutándose, accede a:

- **Frontend**: http://localhost:8080
- **API**: http://localhost:8080/api
- **Health Check**: http://localhost:8080/health  
- **Documentación**: http://localhost:8080/docs

## 🆘 **Resolución de Problemas**

### Puerto ya en uso
```bash
# Cambiar puerto
export PORT=3000
./cubert-vX.X.X-linux-amd64

# O encontrar proceso que usa el puerto
lsof -i :8080
```

### Problemas de permisos
```bash
# Linux/macOS
chmod +x cubert-vX.X.X-linux-amd64

# Si necesitas acceso a directorios del sistema
sudo ./cubert-vX.X.X-linux-amd64
```

### Verificar que funciona
```bash
# Health check
curl http://localhost:8080/health

# Debería devolver:
# {"status":"healthy","service":"cubert-filesystem-api",...}
```

## 📞 **Soporte**

- **Issues**: [GitHub Issues](https://github.com/tuusername/cubert/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tuusername/cubert/wiki)
- **Ejemplos**: [Carpeta examples/](https://github.com/tuusername/cubert/tree/main/examples)

## 🎯 **Próximos Pasos**

1. **Explorar la interfaz** futurista inspirada en "Passengers"
2. **Navegar archivos** con la API de filesystem
3. **Probar las funciones** de búsqueda y filtrado
4. **Ver la documentación** completa de la API

¡Disfruta usando Cubert! 🚀