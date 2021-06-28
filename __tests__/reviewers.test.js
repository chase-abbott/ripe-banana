import db from '../lib/utils/db.js';
import supertest from 'supertest';
import app from '../lib/app.js';

const request = supertest(app);

describe.skip('Reviewer routes', () => {
  beforeAll(() => {
    return db.sync({ force: true });
  });

  afterAll(() => {
    return db.close();
  });

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

  // need to create reviews before testing to get a reviewer by id
  // const review = { rating: 4, review: 'very good', film: 'Saving Private Ryan'};
  it('GET a reviewer by id from /api/v1/reviewers/:id', async () => {
    const response = await request.get(`/api/v1/reviewers/${reviewer.id}`);
    // expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: 1,
      name: 'vijay',
      company: 'f-inverse',
      Reviews: [],
    });
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

  it.skip('DELETEs a reviewer from /api/v1/reviewers', async () => {
    const response = await request.delete(`/api/v1/reviewers/${reviewer.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([reviewer]);
  });
});
