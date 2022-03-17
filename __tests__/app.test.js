const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Flower = require('../lib/models/Flower');

describe('AnyAPI routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates a flower', async () => {
    const expected = {
      name: 'dandelion',
      color: 'yellow',
    };
    const res = await request(app).post('/api/v1/flowers').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of flowers', async () => {
    await Flower.insert({
      name: 'dandelion',
      color: 'yellow',
    });
    const expected = [
      { id: '1', name: 'iris', color: 'blue' },
      { id: '2', name: 'dandelion', color: 'yellow' },
    ];
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

  it('deletes a flower by id', async () => {
    const expected = await Flower.findById(1);
    const res = await request(app).delete(`/api/v1/flowers/${expected.id}`);
    expect(res.body).toEqual(expected);
  });
});
