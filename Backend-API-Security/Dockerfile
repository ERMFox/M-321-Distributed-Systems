# Use the official Node.js Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files to install dependencies first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on (default to 3000, adjust if needed)
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
