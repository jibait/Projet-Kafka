# Use an official Node.js version 22.2 image from Docker Hub (replace with the actual image if available)
FROM node:22.2.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the entire folder contents to the container
COPY ./ ./

# Install the dependencies specified in package.json
RUN npm ci

# Run the main file
CMD ["npm", "run", "start"]
