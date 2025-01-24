FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy only package files first
COPY package.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Expose the port
EXPOSE 5001

# Start the application
CMD ["node", "index.js"]