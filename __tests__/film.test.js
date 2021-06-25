import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';

describe.skip('Film routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  afterAll(() => {
    db.close();
  });
  it('puts a new film in the database', async () => {
    const film = {
      title: 'Peaches big adventure',
      studio: 'Big dog productions',
      released: 2010,
    };

    const postRes = await request(app).post('/api/v1/films').send(film);

    expect(postRes.body).toEqual({
      id: 1,
      title: 'Peaches big adventure',
      studio: 'Big dog productions',
      released: 2010,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });
});
