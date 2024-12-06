# Rate limiter

A service that provides rate-limiting mechanism to control SMS requests, ensuring compliance with predefined limits per minute and per day. It uses MySQL as the database for storing and managing request logs and violations.

# Getting Started

Follow these steps to set up and run the project locally.

## Prerequisites

Make sure you have the following installed on your machine:

##### Node.js (version >= 16)

##### npm or yarn

##### MySQL database

## Installation

1. Clone the Repository:

#### git clone https://github.com/Sanikarajpure/zemetric_rate_limiter.git

#### cd zemetric_rate_limiter

2. Install Dependencies:

#### Using npm:

    npm install

#### Or using yarn:

    yarn install

## Environment Setup

## 1. Create a Database:

Start your MySQL server.

#### Create a database to store SMS request logs:

    CREATE DATABASE rate_limiter_db;

## 2. Create environment variables:

The application uses a .env file for environment-specific configurations. Create a .env file in the root of the project and define the required environment variables.

#### Example .env File:

    PORT=3002
    NODE_ENV=development
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_NAME=rate_limiter_db
    ORIGIN_FOR_CORS=http://localhost:3000
    LIMIT_PER_MINUTE=3
    LIMIT_PER_DAY=10

## Available Scripts

##### Start Development Server:

    npm run dev

#### Or using yarn:

    yarn dev

#### The service will be available at http://localhost:3002

## Dependencies

#### Key Libraries

##### Express: Backend framework.

##### Sequelize: ORM for MySQL.

##### MySQL2: MySQL driver for Node.js.

##### dotenv: For managing environment variables.
