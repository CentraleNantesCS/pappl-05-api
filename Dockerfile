FROM tarampampam/node:13-alpine

# Use non-root user
USER node

# Make directory for app to live in
# It's important to set user first or owner will be root
RUN mkdir -p /home/node/app/

# Make sure to create a tmp dir
RUN mkdir -p /home/node/app/tmp

# Set working directory
WORKDIR /home/node/app

# Copy over package.json files
COPY package*.json ./

# Install all packages
RUN yarn

# Copy over source code
COPY . .

# Build AdonisJS for production
RUN yarn build --production

# Expose port 3333 to outside world
EXPOSE 3333

# Start server up
CMD [ "node", "./build/server.js" ]