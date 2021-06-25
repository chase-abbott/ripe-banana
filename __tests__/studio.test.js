import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../models/Studio.js';

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
      updatedAt: expect.any(String),
      createdAt: expect.any(String)
    });




  });


  it('it gets a studio in the database via GET', async () => {
    const studio = await Studio.create({
      name: 'Ruiz Brothers',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
    });

    const res = await request(app).get('/api/v1/studios');
    expect(res.body).toEqual({
      id: 1,
      name: 'Ruiz Brothers'
    });
  });
});
