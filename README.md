# PAPPL 05 - Backend

This project contains the REST API used in our project.

## Prerequisites
- [Postgresql](http://www.postgresql.org/)
- [NodeJS LTS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Yarn](https://yarnpkg.com/)
- [AdonisJS 5](http://adonisjs.com/)

**Note:** If you are new to AdonisJS, I recommend to watch
[AdonisJs V5 Tour](https://www.youtube.com/watch?v=TysfaNcFX_Y).

## Getting Started

After cloning the repo:

```bash
# Install the dependancies
yarn

# Fill the .env file
cp .env.example .env

# Run the migrations
node ace migration:run

# Start the development serve
yarn dev
```

## Docker

The project includes a Dockerfile if you would like to run it in a container.

```Dockerfile
FROM tarampampam/node:13-alpine

# Install pm2
RUN npm install pm2 -g

# Create the app dir & tmp folder
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
```

## Stack

### Framework

This project was built using [Adonis](https://preview.adonisjs.com/) a node js framework, we're using the new preview version V5 which uses Typescript.