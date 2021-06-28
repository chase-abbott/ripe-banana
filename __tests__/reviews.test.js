import db from '../lib/utils/db.js';
import supertest from 'supertest';
import app from '../lib/app.js';

const request = supertest(app);

describe('Reviews Routes', () => {
  beforeAll(() => {
    return db.sync({ force: true });
  });

  afterAll(() => {
    db.close();
  });

  it('POSTs a review to /api/v1/reviews', async () => {
    const response = await request.post('/api/v1/reviews').send(review);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(review);
  });
});
