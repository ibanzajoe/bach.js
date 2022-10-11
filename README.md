# Bach.js - Nest.js + Next.js + Tailwind + Lerna/NX

I started this project mainly because I have yet to find a suitable starter framework built using the latest stack with Nest.js and Next.js. These frameworks are great but there are still a lot of boilerplating you need to do when you are building your next project idea. 

Some other motivations behind this framework was to speed up Nest.js dev time using Vite. I found the time it takes to hot-reload after each code change painful as the code base grew. Thankfully Vite was able to resolve these issues and putting this available for everyone to use.

“Ceaseless work...that is my secret.” - J.S. Bach

<img src="https://d3fr1q02b1tb0i.cloudfront.net/wp-content/uploads/2017/11/06075602/Bach-bye-bye.jpg" width="300" />

## Features
- Nest.js equipped with Vite for astonishgly faster Hot Module Replacement 🔥
- Next.js + Tailwind UI theme for client and admin
- Lerna with NX for faster builds and caching
- TypeORM with better transactional support
- Swagger documentation, [Joi](https://github.com/hapijs/joi) validation, Winston logger, ...
- User auth and role-based access control
- REST API w/ pagination 
- Folder structure, code samples and best practices
- CI/CD ready using Github Actions

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

- Node v16+
- Yarn 1.22+
- Up-to-date installation of [Docker](https://www.docker.com/) is useful for setting up your local environment, but it is not required for development.

### 1.2 Project configuration

Start by cloning this project on your workstation.

```sh
git clone https://github.com/jaequery/bach.js
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./bachjs
yarn
```

Once the dependencies are installed, you can now configure your project by creating a new `.env` file containing your environment variables used for development.

```
cp .env.example .env
vi .env
```

The example configuration is already setup to work with the Postgres database that will be instantiated via our docker-compose.yml file. But if you wish to use your separate Postgres instance, you may modify this file to suit your needs.

Last but not least, update the `JWT_SECRET` to sign the JWT tokens.

### 1.3 Launch and discover

You are now ready to launch the Postgres database, NestJS backend, and Next.js frontend using the commands below.

```sh
# Start Postgres database using Docker
yarn db:start

# Launch the backend development server
yarn api:start

# Launch the frontend development server
yarn ui:start
```

You can now head to `http://localhost:3000` for backend as well as `http://localhost:3001` for frontend to verify they are up and running.

## 2. Project structure

This template was made with a well-defined directory structure.

```sh
src/
├── migrations/  # Contains the TypeORM migrations
├── modules
│   ├── common/  # The common module containing interfaces, pipes, guards, services used in the whole application
│   ├── user/
│   │   ├── user.entity.ts
│   │   ├── user.controller.ts
│   │   ├── user.controller.spec.ts
│   │   ├── user.service.ts
│   │   ├── user.service.spec.ts
│   │   ├── user.module.ts
│   │   ├── user.dto.ts
```

## 3. Default NPM commands

The CLI commands below are already included with this template and can be used to quickly run, build and test your project.

```sh

# Start the Nest.js backend API w/ faster hot-reloads
yarn api:start

# Run the UI app using Next.js
yarn ui:start

# Create a new migration named MyMigration
yarn db:migration:create [MyMigration]

# Run the TypeORM migrations
yarn db:migration:up

# Revert the TypeORM migrations
yarn db:migration:down

# Builds all the apps
yarn build

# Tests all the apps
yarn test
```

## 4. Project goals

The goal of this project is to provide a clean and up-to-date "starter pack" for REST API projects that are built with Nest.js and Next.js.

## 5. Roadmap

The following improvements are currently in progress :

- [x] Configuration validation
- [x] TypeORM migration support
- [x] Project structure documentation
- [ ] CI/CD ready improvements and better usage of environment variables
- [ ] Secure authentication using JWT
- [ ] Support SSO using Google
- [ ] Role-based access control
- [ ] Better logging configuration
- [ ] Pagination support
- [ ] Backend + UI scaffolder
- [ ] Out of the box integrations to Segment for user tracking and events

## 6. Contributing

Feel free to suggest an improvement, report a bug, or ask something: [https://github.com/jaequery/bachjs/issues](https://github.com/jaequery/bachjs/issues)
