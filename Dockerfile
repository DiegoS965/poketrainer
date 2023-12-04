# Step 1: Build the application
FROM node:latest as build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Step 2: Serve the application from Nginx
FROM nginx:alpine
COPY --from=build /app/dist/poketrainer /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]