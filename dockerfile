# ===== FRONTEND BUILD =====
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# ===== BACKEND =====
FROM node:20 AS backend
WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm install

COPY backend/ .

# Copy frontend build → backend/public
COPY --from=frontend-build /app/dist ./public

EXPOSE 5555
CMD ["node", "server.js"]
