/* eslint-disable no-console */
import db from '../lib/utils/db.js';
import request from 'supertest';
import app from '../lib/app.js';
import Studio from '../lib/models/Studio.js';
import Film from '../lib/models/Film.js';
import Review from '../lib/models/Review.js';
import Actor from '../lib/models/Actor.js';
import Reviewer from '../lib/models/Reviewer.js';


describe('Film routes', () => {
  beforeAll(() => {
    return db
      .sync({ force: true })
      .then(() => Studio.findByPk(1))
      .then((studio) => {
        if (!studio)
          Studio.create({
            name: 'Chase inc',
            city: 'Portland',
            state: 'Oregon',
            country: 'USA',
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  afterAll(() => {
    db.close();
  });
  it('puts a new film in the database', async () => {
    const film = {
      title: 'Peaches big adventure',
      studio: 1,
      released: 2010,
    };

    const postRes = await request(app).post('/api/v1/films').send(film);

    expect(postRes.body).toEqual({
      id: 1,
      title: 'Peaches big adventure',
      studio: 1,
      released: 2010,
      updatedAt: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('get all the films', async () => {
    await Film.create({
      title: 'All the movies',
      studio: 1,
      released: 2021,
    });
    const res = await request(app).get('/api/v1/films');
    expect(res.body).toEqual([
      {
        id: 1,
        title: 'Peaches big adventure'
      },
      {
        id: 2,
        title: 'All the movies'
      }
    ]);
  });

  it('gets a film by its id', async () => {
    const actor = await Actor.create({
      name: 'Taylor the Magician',
      dob: new Date(),
      pob: 'Disneyland',
    });
    
    const film = await Film.findByPk(1);

    const reviewer = await Reviewer.create({
      name: 'vijay', 
      company: 'f-inverse'
    });

    const review = await Review.create({
      rating: 4,
      reviewer: reviewer.id,
      review: 'this is a test to post a review',
      film: film.id,
    });

    await film.setActors([actor]);

    const expected = {
      title: 'Peaches big adventure',
      released: 2010,
      studio: {
        id: 1,
        name: 'Chase inc'
      },
      cast: [{
        id: 1,
        name: 'Taylor the Magician'
      }],
      reviews: [{
        id: 1,
        rating: 4,
        review: 'this is a test to post a review',
        reviewer: {
          id: 1,
          name: 'vijay' 
        }
      }]
    };

    const res = await request(app).get('/api/v1/films/1');

    expect(res.body).toEqual(expected);
  });
});
