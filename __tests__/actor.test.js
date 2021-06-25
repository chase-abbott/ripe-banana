
import request from 'supertest';
import app from '../lib/app';
import Actor from '../lib/models/Actor';
import db from '../lib/utils/db';



describe('Actor Routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  afterAll(() => {
    db.close();
  });
  it('puts a new actor in the database', async () => {
    const actor = {
      name: 'Taylor the Magician',
      dob: new Date,
      pob: 'Disneyland',

    };
    const res = await request(app).post('/api/v1/actors').send(actor);

    expect(res.body).toEqual({
      id: 1,
      name: 'Taylor the Magician',
      dob: actor.dob.toISOString()
      ,
      pob: 'Disneyland',
      updatedAt: expect.any(String),
      createdAt: expect.any(String),

    });
  });

  it('get all the actors', async () => {
    await Actor.create({
      name: 'Chevy Chase',
      dob: new Date,
      pob: 'Los Angeles'
    });
    const res = await request(app).get('/api/v1/actors');
    expect(res.body).toEqual([{
      id: 1,
      name: 'Chevy Chase',
    }]);
  });


});

