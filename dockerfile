# Use an official Node.js version 22.2 image from Docker Hub (replace with the actual image if available)
FROM node:22.2.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the entire folder contents to the container
COPY ./scraper/ ./

# Install the dependencies specified in package.json
RUN npm install

# Run the main file
CMD ["node", "main.cjs"]
