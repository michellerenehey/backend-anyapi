const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flower = require('../lib/models/Flower');
// const flowers = require('../lib/controllers/flowers');

describe('AnyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a flower', async () => {
    const expected = {
      name: 'iris',
      color: 'blue',
    };
    const res = await request(app).post('/api/v1/flowers').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of flowers', async () => {
    const expected = await Flower.findAll();
    const res = await request(app).get('/api/v1/flowers');
    expect(res.body).toEqual(expected);
  });
});
