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

  it('signs OUT the current user', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'charlie',
      password: 'lovemesomeskittles',
    });

    await agent
      .post('/api/v1/users/sessions')
      .send({ username: 'charlie', password: 'lovemesomeskittles' });

    const res = await agent.delete('/api/v1/users/sessions');

    expect(res.body).toEqual({ message: 'You have been signed out!' });
  });

  it('allows a signed in user to view secrets', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'charlie',
      password: 'lovemesomeskittles',
    });

    let res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(401);

    await agent
      .post('/api/v1/users/sessions')
      .send({ username: 'charlie', password: 'lovemesomeskittles' });

    res = await agent.get('/api/v1/secrets');
    expect(res.status).toEqual(200);
  });

  it('should allow a signed in user to add a secret', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'charlie',
      password: 'lovemesomeskittles',
    });

    let res = await agent
      .post('/api/v1/users/sessions')
      .send({ username: 'charlie', password: 'lovemesomeskittles' });

    expect(res.status).toEqual(200);

    res = await agent.post('/api/v1/secrets/').send({
      title: 'hello world',
      description: 'existance is pain',
      userId: '1',
    });

    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'hello world',
      description: 'existance is pain',
      userId: '1',
      createdAt: expect.any(String),
    });
  });
});
