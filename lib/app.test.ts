import * as request from 'supertest';
import app from './app';

test('should return GET request successfulll!!!!', done => {
  request(app)
    .get('/')
    .expect(200, 'GET request successfulll!!!!')
    .end(err => {
      if (err) {
        return done(err);
      }
      done();
    });
});