import db from '../lib/utils/db.js';
import supertest from 'supertest';
import app from '../lib/app.js';

const request = supertest(app);

describe('API routes', () => {
  beforeAll(() => {
    return db.sync({ force: true });
  });

  describe('Reviewer routes', () => {
    let reviewer = { name: 'vijay', company: 'f-inverse' };
    it('POSTs a reviewer to /api/v1/reviewers', async () => {
      const response = await request.post('/api/v1/reviewers').send(reviewer);
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
    //let review = {rating: 4, review: 'very good', film: }
    it.skip('GET a reviewer by id from /api/v1/reviewers/:id', async () => {
      const response = await request.get(`/api/v1/reviewers/${reviewer.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([reviewer]);
    });
  });
});
