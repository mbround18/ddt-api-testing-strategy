import * as db from './db.json';
import routes from './routes';
import { times } from 'lodash';

const database = JSON.parse(JSON.stringify(db));

if (process.env.NODE_ENV !== 'production') {
  Object.keys(database).forEach(key =>
    times(10, async () => {
      database[key].push({
        id: database[key].length,
        ...(await new routes[key].model(database[key]).generateMock())
      });
    })
  );
}

export { database };
