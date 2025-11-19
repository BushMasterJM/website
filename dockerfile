# Build stage
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source files and markdown posts
COPY src ./src
COPY public ./public
COPY devPostsMd ./devPostsMd

# Build the React application
RUN npm run build

# Production stage
FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm install --production

# Copy built React app from build stage
COPY --from=build /app/build ./build

# Copy markdown posts directory
COPY devPostsMd ./devPostsMd

# Copy server file
COPY server.js ./

# Expose port
EXPOSE 5555

# Set environment to production
ENV NODE_ENV=production

# Start the server
CMD ["node", "server.js"]