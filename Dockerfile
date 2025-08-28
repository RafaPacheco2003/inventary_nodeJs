# Imagen base de Node.js
FROM node:18-alpine AS builder

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY src/ ./src/
COPY .env ./

# Compilar la aplicación TypeScript
RUN npm run build

# Imagen final más ligera
FROM node:18-alpine

# Establecer variables de entorno
ENV NODE_ENV=production

# Directorio de trabajo en el contenedor
WORKDIR /app

# Copiar desde la etapa de compilación
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env ./

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Exponer el puerto
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/server.js"]
