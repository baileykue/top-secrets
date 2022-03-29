const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user', async () => {
    const res = await request(app)
      .post('/api/v1/users/')
      .send({ username: 'charlie', password: 'lovemesomeskittles' });

    expect(res.body).toEqual({ id: expect.any(String), username: 'charlie' });
  });
});
