import { request } from '../app';
import routes from '../routes';
import { expect } from 'chai';
import { pick, merge } from 'lodash';
import { random } from 'faker';
import { HTTP_METHODS } from '../utils/constants';
import { chaosMonkey } from '../utils/chaosMonkey';

describe('Negative Static Smoke Tests', () => {
  HTTP_METHODS.forEach(httpMethod => {
    it(`should return a 404 for invalid ${httpMethod} route`, async () => {
      const res = await request[httpMethod](`/${random.alphaNumeric(10)}`).set(
        'Accept',
        'application/json'
      );
      expect(res.status).to.equal(httpMethod === 'options' ? 204 : 404);
      expect(res.body).to.deep.equal({});
    });
  });
});

Object.entries(routes).forEach(([routeName, routeInfo]) => {
  describe(`${routeName.toUpperCase()} Negative Test`, async () => {
    // GET single negative path test
    it('should return 404 for non-existant a member', async () => {
      const res = await request
        .get(`/${routeName}/${random.number() * 9}`)
        .set('Accept', 'application/json');
      expect(res.status).to.equal(404);
      expect(res.body).to.be.empty;
    });

    // POST negative path test
    it('should sanatize posting garbage data', async () => {
      const model = new routeInfo.model();
      const data = await model.create();
      const chaosData = chaosMonkey(data);
      const dataKeys = Object.keys(chaosData);
      const res = await request
        .post(`/${routeName}`)
        .send(chaosData)
        .set('Accept', 'application/json');

      expect(res.status).to.equal(201);
      expect(res.body).not.to.be.empty;
      expect(pick(res.body, dataKeys)).to.deep.equal(chaosData);
    });

    // PUT negative path test
    it('should be able to update a member', async () => {
      const model = new routeInfo.model();
      const data = await model.findOne();
      const newData = await model.generateMock();
      const chaosData = chaosMonkey(newData);
      const dataKeys = Object.keys(data);
      const res = await request
        .put(`/${routeName}/${data.id}`)
        .send(merge(data, chaosData))
        .set('Accept', 'application/json');

      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      // Expected outcome, data is read-only with json-server
      expect(pick(res.body, dataKeys)).to.deep.equal(data);
    });

    // DELETE Happy path test
    it('should be able to remove a member', async () => {
      const model = new routeInfo.model();
      const data = await model.findOne();
      const res = await request
        .delete(`/${routeName}/${data.id}`)
        .set('Accept', 'application/json');

      expect(res.status).to.equal(200);
      expect(res.body).to.be.empty;
    });
  });
});
