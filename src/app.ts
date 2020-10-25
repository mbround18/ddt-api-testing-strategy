import * as jsonServer from 'json-server';
import { database } from './database';
import * as agent from 'supertest';

const server = jsonServer.create();

const router = jsonServer.router(database);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const request = agent(server);

export { server, request };
export default server;
