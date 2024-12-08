const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
    it('should register a user', async () => {
        const response = await request(app).post('/api/users/register').send({
            username: 'testuser',
            password: 'password123',
            email: 'testuser@example.com',
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });
});

// npm test