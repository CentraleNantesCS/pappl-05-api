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

# Run the database seeders
node ace db:seed

# Start the development serve
yarn dev
```

The project should be available on [http://localhost:3000/](http://localhost:3000/) and you can login using the seeded user info:

```
  email: 'admin@admin.fr'
  password: 'password'
```

## Docker

The project includes a [Dockerfile](./Dockerfile) if you would like to run it in a container.

## Stack

### Framework

This project was built using [Adonis](https://preview.adonisjs.com/) a node js framework, we're using the new preview version V5 which uses Typescript.