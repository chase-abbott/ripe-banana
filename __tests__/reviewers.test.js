/* eslint-disable no-console */
import db from '../lib/utils/db.js';
import supertest from 'supertest';
import app from '../lib/app.js';
import Film from '../lib/models/Film.js';
import Studio from '../lib/models/Studio.js';
import Review from '../lib/models/Review.js';
//import Reviewer from '../lib/models/Reviewer.js';

const request = supertest(app);

describe('Reviewer routes', () => {
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

  let review = {};
  let reviewer = { name: 'vijay', company: 'f-inverse' };

  it('POSTs a reviewer to /api/v1/reviewers', async () => {
    const response = await request.post('/api/v1/reviewers').send(reviewer);
    reviewer.id = expect.any(Number);
    reviewer.updatedAt = expect.any(String);
    reviewer.createdAt = expect.any(String);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(reviewer);
    reviewer = response.body;
  });

  it('GETs all reviewers from /api/v1/reviewers', async () => {
    const response = await request.get('/api/v1/reviewers');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([reviewer]);
  });

  it('GET a reviewer by id from /api/v1/reviewers/:id', async () => {
    const film = await Film.findByPk(1);
    review = {
      rating: 4,
      reviewer: reviewer.id,
      review: 'this is a test to post a review',
      film: film.id,
    };
    review = await Review.create(review);
    const expected = {
      id: reviewer.id,
      name: reviewer.name,
      company: reviewer.company,
      Reviews: [
        {
          id: review.id,
          rating: review.rating,
          review: review.review,
          Film: { id: film.id, title: film.title },
        },
      ],
    };
    const response = await request.get(`/api/v1/reviewers/${reviewer.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expected);
  });

  it('PUTs an update to a reviewer at /api/v1/reviewers', async () => {
    reviewer.company = 'inferencery';
    const response = await request
      .put(`/api/v1/reviewers/${reviewer.id}`)
      .send(reviewer);
    reviewer.updatedAt = expect.any(String);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(reviewer);
    reviewer = response.body;
  });

  it('DELETEs a reviewer from /api/v1/reviewers', async () => {
    let response = await request.delete(`/api/v1/reviewers/${reviewer.id}`);
    expect(response.status).toBe(500);

    await Review.destroy({ where: { id: review.id } });

    response = await request.delete(`/api/v1/reviewers/${reviewer.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      message: 'successfully deleted reviewer',
    });
  });
});
