# Task List/Todo App

Simple to-do app with user authentication middleware.

## Dependencies

**[NodeJS](https://nodejs.org/en/)**
**[MySQL](https://www.apachefriends.org/download.html)** or **[Docker for database usage](https://docs.docker.com/get-docker/)**
**[NPM](https://www.npmjs.com/get-npm)**

## Installation

Install nodemon either globally or in dev dependencies

```bash
npm install -g nodemon
```

```bash
npm install --save-dev nodemon
```

Install the remaining packages

```bash
npm install
```

## Usage

To start the application.
```bash
npm run dev
```

For using docker as a database server
```bash
docker-compose -f .\docker-compose.yml up -d
npm run dev
```

## Testing

To run the test scripts

```bash
npm run test
```