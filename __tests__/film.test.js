import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';

describe('Film routes', () => {
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
      StudioId: null,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('gets all films from the database', async () => {

    const studio = await Studio.create({
      name: '',
      city: '',
      state: '',
      country: ''
    });

    await Film.create({
      title: 'Peaches big adventure',
      StudioId: studio.id,
      released: 2010,
    });


    const res = await request(app).get('/api/v1/films');
    expect(res.body).toEqual([
      {
        id: 1,
        title: 'Peaches big adventure',
        Studio: { id: studio.id, name: '' },
        released: 2010,

      }
    ]);
  });






});
