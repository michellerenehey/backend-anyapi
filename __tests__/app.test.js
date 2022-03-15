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

  it('gets a flower by id', async () => {
    const expected = await Flower.findById(1);
    const res = await request(app).get(`/api/v1/flowers/${expected.id}`);
    expect(res.body).toEqual({ ...expected });
  });

  it('returns 404 for flower not found', async () => {
    const res = await request(app).get(
      '/api/v1/flowers/fake-id-does-not-exist'
    );
    expect(res.status).toEqual(404);
  });

  it('updates a flower by id', async () => {
    const expected = {
      id: expect.any(String),
      name: 'iris',
      color: 'purple',
    };
    const res = await request(app)
      .patch('/api/v1/flowers/1')
      .send({ color: 'purple' });
    expect(res.body).toEqual(expected);
  });
});
