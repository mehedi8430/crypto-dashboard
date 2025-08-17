# Stage 1: Build the application
FROM oven/bun:1.1-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy all files
COPY . .

# Build the application
RUN bun run build

# Stage 2: Serve the application using a static file server
FROM oven/bun:1.1-alpine

# Install serve globally
RUN bun add -g serve

# Copy the built files from the builder stage
COPY --from=builder /app/dist /usr/src/app

# Set working directory
WORKDIR /usr/src/app

# Expose port 5173
EXPOSE 5173

# Start the server
CMD ["bun", "run", "start"]