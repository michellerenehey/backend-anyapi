const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

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
});
