# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk update && apk add --no-cache openssl


# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Production
FROM node:20-alpine

WORKDIR /app

# Install OpenSSL for Prisma
RUN apk update && apk add --no-cache openssl


# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy Prisma schema and generated client
COPY prisma ./prisma
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
# Also Prisma client needs the generated core files, easiest is to regenerate or copy everything needed
RUN npx prisma generate

# Copy the built application from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the port your app runs on (update if different, default is often 3000, 5000, or 8080)
EXPOSE 7000

# Command to run the application
# We use a script or direct command. 
# It's recommended to run prisma migrate deploy before start in a real setup, but we'll do it via the start command or docker-compose
CMD ["npm", "start"]
