# Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps --production

# Copy the rest of the app
COPY . .

# Build the NestJS app
RUN npm run build



# Start the app
CMD ["npm", "run", "start:prod"]