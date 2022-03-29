const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('top-secrets routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs UP a  new user', async () => {
    const res = await request(app)
      .post('/api/v1/users/')
      .send({ username: 'charlie', password: 'lovemesomeskittles' });

    expect(res.body).toEqual({ id: expect.any(String), username: 'charlie' });
  });

  it('signs IN an existing user', async () => {
    const user = await UserService.create({
      username: 'charlie',
      password: 'lovemesomeskittles',
    });

    const res = await request(app)
      .post('/api/v1/users/sessions')
      .send({ username: 'charlie', password: 'lovemesomeskittles' });

    expect(res.body).toEqual({ message: 'You have been signed in!', user });
  });
});
