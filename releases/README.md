# 🚀 Cubert - Releases

Esta carpeta contiene los binarios compilados de Cubert, listos para deployment.

## 📦 Contenido

- `cubert-embedded` - Binario principal con frontend React embebido y API Go completa

## 🌟 Características del Binario

✅ **Self-contained**: Contiene toda la aplicación en un solo archivo  
✅ **Zero dependencies**: No requiere Node.js, npm, o dependencias externas  
✅ **Frontend embebido**: React app completa incluida  
✅ **API completa**: Todas las funcionalidades del backend  
✅ **Cross-platform**: Funciona en Linux, macOS, y Windows  

## 🚀 Cómo usar

### Ejecutar localmente
```bash
./cubert-embedded
```

### Deployment en servidor
```bash
# Copiar al servidor
scp cubert-embedded user@server:/opt/cubert/

# Ejecutar en el servidor
ssh user@server
cd /opt/cubert
./cubert-embedded
```

### Como servicio systemd (Linux)
```bash
# Crear archivo de servicio
sudo tee /etc/systemd/system/cubert.service << EOF
[Unit]
Description=Cubert File Manager
After=network.target

[Service]
Type=simple
User=cubert
WorkingDirectory=/opt/cubert
ExecStart=/opt/cubert/cubert-embedded
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

# Activar servicio
sudo systemctl daemon-reload
sudo systemctl enable cubert
sudo systemctl start cubert
```

## 🌐 URLs disponibles

Una vez ejecutándose, la aplicación estará disponible en:

- **Frontend**: http://localhost:8080
- **API**: http://localhost:8080/api/v1/*
- **Health check**: http://localhost:8080/health
- **Documentation**: http://localhost:8080/docs

## 📋 Información del binario

- **Tamaño**: ~19MB
- **Arquitectura**: linux/amd64 (por defecto)
- **Optimizado**: Compilado con flags `-ldflags="-w -s"`
- **Compresión**: Opcionalmente comprimido con UPX

## 🔧 Desarrollo

Para generar nuevos binarios:

```bash
# Build estándar
make build-embedded

# Build con compresión
make build-embedded-compressed

# Build debug
./build.sh --debug
```

## 📝 Notas

- Los binarios son ignorados por Git (.gitignore)
- Se regeneran completamente en cada build
- Incluyen la versión más reciente del frontend y backend
- Archivo único para deployment simplificado