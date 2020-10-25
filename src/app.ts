import * as data from './db.json';
import * as jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

export default server;
