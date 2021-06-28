/* eslint-disable no-console */
import db from '../lib/utils/db.js';
import supertest from 'supertest';
import app from '../lib/app.js';
import Reviewer from '../lib/models/Reviewer.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';

const request = supertest(app);

describe('Reviews Routes', () => {
  beforeAll(() => {
    return db
      .sync({ force: true })
      .then(() => Reviewer.findByPk(1))
      .then((reviewer) => {
        if (!reviewer) Reviewer.create({ name: 'vijay', company: 'f-inverse' });
      })
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
      .then(() => Film.findByPk(1))
      .then((film) => {
        if (!film)
          Film.create({ title: 'Fight Club', studio: 1, released: 1999 });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  afterAll(() => {
    return db.close();
  });
  let film = {};
  let review = {};
  it('POSTs a review to /api/v1/reviews', async () => {
    const reviewer = await Reviewer.findByPk(1);
    film = await Film.findByPk(1);
    review = {
      rating: 4,
      reviewer: reviewer.id,
      review: 'this is a test to post a review',
      film: film.id,
    };
    const response = await request.post('/api/v1/reviews').send(review);
    review.id = expect.any(Number);
    review.updatedAt = expect.any(String);
    review.createdAt = expect.any(String);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(review);
  });

  it('GETs reviews from /api/v1/reviews', async () => {
    const expected = {
      id: review.id,
      rating: review.rating,
      review: review.review,
      Film: { id: film.id, title: film.title },
    };
    const response = await request.get('/api/v1/reviews');
    expect(response.status).toBe(200);
    expect(response.body.length).toBeLessThanOrEqual(100);
    expect(response.body).toStrictEqual([expected]);
  });

  it('DELETEs a review from /api/v1/reviews/:id', async () => {
    const response = await request.delete(`/api/v1/reviews/${review.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ numRows: 1 });
  });
});
