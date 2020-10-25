import { request } from '../app';
import routes from '../routes';
import { expect } from 'chai';
import { pick, merge } from 'lodash';

Object.entries(routes).forEach(([routeName, routeInfo]) => {
  describe(`${routeName.toUpperCase()} Smoke Test`, async () => {
    // Get all happy path test
    it('should be able to get all memebers', async () => {
      const res = await request
        .get(`/${routeName}`)
        .set('Accept', 'application/json');
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('array');
    });

    // GET single happy path test
    it('should be able to get a member', async () => {
      const res = await request
        .get(`/${routeName}/1`)
        .set('Accept', 'application/json');
      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
      expect(res.body).to.be.an('object');
    });

    // POST happy path test
    it('should be able to add a member', async () => {
      const model = new routeInfo.model();
      const data = await model.create();
      const dataKeys = Object.keys(data);
      const res = await request
        .post(`/${routeName}`)
        .send(data)
        .set('Accept', 'application/json');

      expect(res.status).to.equal(201);
      expect(res.body).not.to.be.empty;
      expect(pick(res.body, dataKeys)).to.deep.equal(data);
    });

    // PUT Happy path test
    it('should be able to update a member', async () => {
      const model = new routeInfo.model();
      const data = await model.findOne();
      const newData = await model.generateMock();

      const dataKeys = Object.keys(data);
      const res = await request
        .put(`/${routeName}/${data.id}`)
        .send(merge(data, newData))
        .set('Accept', 'application/json');

      expect(res.status).to.equal(200);
      expect(res.body).not.to.be.empty;
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
