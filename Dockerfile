FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g vite@4.0.0
# Copy the rest of the application code to the container
COPY . .

# Build the VITE app
RUN npm run build

# Expose port 3000 for the app
EXPOSE 4000

# Start the app
CMD [ "npm","run" ,"dev" ]