import db from '../lib/utils/db.js';
import supertest from 'supertest';
import app from '../lib/app.js';

const request = supertest(app);

describe('API routes', () => {
  beforeAll(() => {
    return db.sync({ force: true });
  });

  describe('Reviewer routes', () => {
    it('POSTs a reviewer to /api/v1/reviewers', async () => {
      const reviewer = { name: 'vijay', company: 'f-inverse' };
      const response = await request.post('/api/v1/reviewers').send(reviewer);
      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual(reviewer);
    });
  });
});
