/* POST /api/v1/:model adds an item to the DB and returns an object with the added item
GET /api/v1/:model returns a list of :model items
GET /api/v1/:model/ID returns a single item by ID
PUT /api/v1/:model/ID returns a single, updated item by ID
DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found */

'use strict';

process.env.SECRET = 'TEST_SECRET';

const { db } = require('../src/models');

//const { db } = require('../src/auth/models');
const supertest = require('supertest');
const server = require('../src/server').server;
const { users } = require('../src/auth/models');

const mockRequest = supertest(server);

let foodData = {
  testFood: { name: 'fries', calories: '10000', type: 'vegetable' },
};

beforeAll(async () => {
  await db.sync();
  // await users.create(userData.adminUser);
});

afterAll(async () => {
  await db.drop();
});

describe('V1 router', () => {

  it('Can POST a new item and return the object', async () => {
    const response = await mockRequest.post('/api/v1/food').send(foodData.testFood);
    const foodObject = response.body;

    expect(response.status).toBe(201);
    expect(foodObject.token).toBeDefined();
    expect(foodObject.user.id).toBeDefined();
    expect(foodObject.user.username).toEqual(foodData.testFood.name);
  });

});
