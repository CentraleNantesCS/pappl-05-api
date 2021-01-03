FROM tarampampam/node:13-alpine

# Install pm2
RUN npm install pm2 -g


RUN mkdir -p /app/tmp

# Set working directory
WORKDIR /app

# Copy over package.json files
COPY package.json ./
COPY yarn.lock ./

# Install all packages
RUN yarn install --silent

# Copy over source code
COPY . .

# Build the project
RUN yarn build

# Expose port 3333 to outside world
EXPOSE 3333

# Start server up
CMD ["pm2-runtime","./build/server.js"]
