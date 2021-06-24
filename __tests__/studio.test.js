import Studio from '../models/Studio.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    Studio.sync({ force: true });
  });

  it('puts a new studio in the database', async () => {
    const studio = {
      name: 'Chase inc',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA'
    };

    return request(app)
      .post('/api/v1/studios')
      .send(studio)
      .then(res => {
        expect(res.body).toEqual({
          id: 1,
          name: 'Chase inc',
          city: 'Portland',
          state: 'Oregon',
          country: 'USA'
        });
      });

  });
});
