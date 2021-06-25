import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  it('puts a new studio in the database', async () => {
    const studio = {
      name: 'Chase inc',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA'
    };

    const postRes = await request(app)
      .post('/api/v1/studios')
      .send(studio);
      
    expect(postRes.body).toEqual({
      id: 1,
      name: 'Chase inc',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
      createAt: expect.any(Date),
      updateAt: expect.any(Date)
    });
     

  });
});
