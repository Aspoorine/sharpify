# Stage 1 - Build the application
FROM node:alpine as builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2 - Serve the application with NGINX
FROM nginx

# Copy the NGINX configuration
COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build files to NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 3050

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
