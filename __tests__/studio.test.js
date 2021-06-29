import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';

describe('Studio routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  afterAll(() => {
    db.close();
  });
  it('puts a new studio in the database', async () => {
    const studio = {
      name: 'Chase inc',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
    };

    const postRes = await request(app).post('/api/v1/studios').send(studio);

    expect(postRes.body).toEqual({
      id: 1,
      name: 'Chase inc',
      city: 'Portland',
      state: 'Oregon',
      country: 'USA',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('it gets all studios in the database via GET', async () => {
    await Studio.create({
      name: 'Ruiz Brothers',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
    });

    const res = await request(app).get('/api/v1/studios');
    expect(res.body).toEqual([
      {
        id: 1,
        name: 'Ruiz Brothers',
      },
    ]);
  });

  it('gets a studio by its id', async () => {
    const studio = await Studio.create({
      name: 'Ruiz Brothers',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
    });

    await Film.create({
      title: 'Peaches big adventure',
      studio: 1,
      released: 2010,
      StudioId: studio.id,
    });

    const res = await request(app).get('/api/v1/studios/1');

    expect(res.body).toEqual({
      id: 1,
      name: 'Ruiz Brothers',
      city: 'Los Angeles',
      state: 'California',
      country: 'USA',
      Films: [{ id: 1, title: 'Peaches big adventure' }],
    });
  });
});
