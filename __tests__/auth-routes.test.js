'use strict';

const { db } = require('../src/auth/models');
const supertest = require('supertest');
const server = require('../src/server').server;

const mockRequest = supertest(server);

let userInfo = {
  testUser: { username: 'foo', password: 'bar' },
};

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

describe('Auth router', () => {

  it('Can create a new user', async () => {
    const response = await mockRequest.post('/signup').send(userInfo.testUser);
    const userObject = response.body;

    expect(response.status).toBe(201);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(userInfo.testUser.username);
  });

  it('Can sign in with basic auth string', async () => {
    let { username, password } = userInfo.testUser;

    const response = await mockRequest.post('/signin').auth(username, password);

    const userObject = response.body;
    expect(response.status).toBe(200);
    expect(userObject.token).toBeDefined();
    expect(userObject.user.id).toBeDefined();
    expect(userObject.user.username).toEqual(username);
  });
});

