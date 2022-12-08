# LAB - Class 08

## Project: Access Control

## Author: Kenny W. Lino

## Problem Domain

In this lab, we implement Role-Based Access Control using an Access Control List (ACL), which allows us to control access to routes for those who have access.

To do this, we take the given starter of an auth server and a data server and combine them to create one server.

### Links and Resources

- [ci/cd](https://github.com/kennywlino/auth-api/actions/new)
- [back-end server (production)](https://auth-api-z50x.onrender.com)
- [Main PR from dev](https://github.com/kennywlino/auth-api/pull/1)

### Setup

#### `.env` requirements (where applicable)

i.e.

- `PORT` - Port Number
- `DATABASE_URL` - location of Postgres DB (i.e. postgres://localhost:5432/api-app?sslmode=disable)
- `SECRET` - secret used with bearer auth

#### How to initialize/run your application

- nodemon


### Features / Routes

  - POST `/signup` -- to create a user
  - POST `/signin` --  to login a user and receive a token
  - GET `/secret` -- should require a valid bearer token
  - GET `/users` -- should require a valid token and "delete" permissions
  - Full CRUD `/api/v1/:model` -- works with 'clothes' and 'food' models without authentication
  - Full CRUD `/api/v1/:model` -- works with 'clothes' and 'food' models with authentication

### Tests

- How do you run tests?
  - npm test

- Any tests of note?

(From lab description)

1. Write a suite of tests that make the following assertions, at minimum:
   - AUTH Routes
     - POST /signup creates a new user and sends an object with the user and the token to the client
     - POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client
   - V1 (Unauthenticated API) routes
     - POST /api/v1/:model adds an item to the DB and returns an object with the added item
     - GET /api/v1/:model returns a list of :model items
     - GET /api/v1/:model/ID returns a single item by ID
     - PUT /api/v1/:model/ID returns a single, updated item by ID
     - DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
   - V2 (Authenticated API Routes)
     - POST /api/v2/:model with a bearer token that has `create` permissions adds an item to the DB and returns an object with the added item
     - GET /api/v2/:model with a bearer token that has `read` permissions returns a list of :model items
     - GET /api/v2/:model/ID with a bearer token that has `read` permissions returns a single item by ID
     - PUT /api/v2/:model/ID with a bearer token that has `update` permissions returns a single, updated item by ID
     - DELETE /api/v2/:model/ID with a bearer token that has `delete` permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

#### UML

![Class-08 UML](./assets/CLASS-08_%20Rule-Based%20Access%20Control.jpeg)
