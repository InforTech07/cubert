# Configuración de deployment para Cubert

## Arquitectura de Producción

```
┌─────────────────────────────────────────┐
│               Load Balancer              │
│            (Nginx/Cloudflare)           │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│          Cubert Go Server               │
│         (Puerto 8080)                   │
│                                         │
│ ┌─────────────┐  ┌─────────────────────┐│
│ │   Static    │  │    API Routes       ││
│ │   Files     │  │   /api/v1/*         ││
│ │   Serve     │  │   /health           ││
│ │             │  │   /docs             ││
│ └─────────────┘  └─────────────────────┘│
└─────────────────────────────────────────┘
```

## Build Process

1. **Frontend Build**:
   - React app → Static files
   - Tailwind CSS → Optimized CSS
   - TypeScript → JavaScript
   - Output: `backend/web/static/*`

2. **Backend Serve**:
   - Go server serves static files
   - API routes handle dynamic content
   - Single binary deployment

## Environment Variables

### Backend (.env)
```env
PORT=8080
NODE_ENV=production
CORS_ORIGIN=*
```

### Frontend (Built-in)
```env
REACT_APP_API_URL=/api/v1
REACT_APP_TITLE=Cubert
```

## Deployment Options

### Option 1: Docker
```dockerfile
# Multi-stage build
FROM node:18-alpine AS frontend
WORKDIR /app/client
COPY client/package*.json ./
RUN pnpm install
COPY client/ .
RUN pnpm build

FROM golang:1.21-alpine AS backend
WORKDIR /app
COPY backend/ .
COPY --from=frontend /app/backend/web/static ./web/static
RUN go build -o cubert cmd/server/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=backend /app/cubert .
COPY --from=backend /app/web ./web
EXPOSE 8080
CMD ["./cubert"]
```

### Option 2: Binary Deployment
```bash
# Build
./build.sh --build-binary

# Deploy
scp backend/cubert user@server:/opt/cubert/
scp -r backend/web user@server:/opt/cubert/
ssh user@server 'cd /opt/cubert && ./cubert'
```

### Option 3: Cloud Functions/Serverless
- Vercel/Netlify: Frontend only
- Railway/Render: Full app
- Google Cloud Run: Containerized

## Performance Optimizations

### Frontend
- Code splitting by route
- Asset optimization (images, fonts)
- CSS purging
- Gzip compression

### Backend
- Static file caching headers
- API response compression
- Connection pooling
- Graceful shutdown

## Monitoring

### Health Checks
- `GET /health` - Application status
- `GET /api` - API information
- Static file serving status

### Metrics
- Request latency
- Error rates
- Memory usage
- Active connections

## Security

### Headers
```go
w.Header().Set("X-Content-Type-Options", "nosniff")
w.Header().Set("X-Frame-Options", "DENY")
w.Header().Set("X-XSS-Protection", "1; mode=block")
```

### CORS
- Configurable origins
- Secure methods only
- Proper headers