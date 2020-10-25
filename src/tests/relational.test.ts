import { sample, get, pick } from 'lodash';
import { expect } from 'chai';
import { plural } from 'pluralize';
import { request } from '../app';
import routes from '../routes';
import { database } from '../database';

Object.entries(database).forEach(([key, data]) => {
  const sampleData = sample(data);
  const relationalKeys = Object.keys(sampleData).filter(sampleKey =>
    sampleKey.match(/[a-zA-Z]+id$/i)
  );
  relationalKeys.forEach(relationalKey => {
    const relationalId = get(sampleData, relationalKey, 1);
    const relationalRoute = plural(relationalKey.replace(/id$/i, ''));
    const routeName = plural(key);
    const baseRoutePath = `/${relationalRoute}/${relationalId}/${routeName}`;
    describe(`Relational Data ${key} ${relationalKey} Tests`, () => {
      it('should be able to get a member', async () => {
        const res = await request
          .get(`${baseRoutePath}?id=${sampleData.id}`)
          .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
      });

      it('should be able to get a member with criteria', async () => {
        const res = await request
          .get(`/${routeName}?${relationalKey}=${sampleData[relationalKey]}`)
          .set('Accept', 'application/json');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an('array');
      });

      /**
       * This test has a defect with the json-server.
       * When data is posted to the route it converts the id from an integer to a string.
       * In the live environment it doesnt show show this behavior.
       */
      it.skip('should be able to add a member', async () => {
        const model = new routes[routeName].model();
        const data = await model.create();
        const dataKeys = Object.keys(data);
        const res = await request
          .post(baseRoutePath)
          .send(data)
          .set('Accept', 'application/json');
        expect(res.status).to.equal(201);
        expect(res.body).not.to.be.empty;
        expect(pick(res.body, dataKeys)).to.deep.equal(data);
      });

      // PUT Negative test
      it('should be able to update a member', async () => {
        const res = await request
          .put(baseRoutePath)
          .set('Accept', 'application/json');

        expect(res.status).to.equal(404);
      });
    });
  });
});
