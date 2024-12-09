const supertest = require('supertest');
const app = require('../server');

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await supertest(app).post('/api/auth/register').send({
      username: 'JohnDoe', // Change name to username
      email: 'john@example.com',
      password: 'password123',
    });

    // Check if the response status is 201 (Created)
    expect(res.statusCode).toEqual(201);

    // Check if the response body has a 'message' indicating successful registration
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  it('should log in a user and return a JWT token', async () => {
    // First, register the user (this is necessary to test login)
    await supertest(app).post('/api/auth/register').send({
      username: 'JohnDoe',
      email: 'john@example.com',
      password: 'password123',
    });

    // Then, test the login
    const res = await supertest(app).post('/api/auth/login').send({
      email: 'john@example.com',
      password: 'password123',
    });

    // Check if the response status is 200 (OK)
    expect(res.statusCode).toEqual(200);

    // Check if the response body contains a 'token'
    expect(res.body).toHaveProperty('token');
  });
});
