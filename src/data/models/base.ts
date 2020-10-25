import { get, sample, merge } from 'lodash';
import { plural } from 'pluralize';
import { database } from '../../database';


/**
 * Base model providing base functionality. 
 */
export default class BaseModel<T> {
  [k: string]: any;

  public id?: number;
  constructor(public collection: T[] = []) {}

  public async all() {
    const namespace = plural(this.constructor.name.toLowerCase());
    this.collection = get(database, namespace, []);
    return this.collection;
  }

  public async findOne(opts?: Partial<T>): Promise<undefined | T> {
    const collection = await this.all();
    return sample(collection);
  }

  public async findBy(opts?: Partial<T>): Promise<undefined | T[]> {
    const collection = await this.all();

    return !opts
      ? collection
      : collection.filter(data =>
          // if options are provided match options to user data and return a match based on options provided.
          Object.keys(opts).every(
            searchParam =>
              get(data, searchParam, 'Not found on data') ===
              get(opts, searchParam, 'Not found on opts')
          )
        );
  }

  // This is a stub which will throw if the model does not implement it correctly.
  public async generateMock(): Promise<Partial<T>> {
    throw new Error('Not yet implemented!');
  }

  // If real data is provided, create for information else use mock.
  public async create(opts?: T): Promise<Partial<T>> {
    const data = opts || (await this.generateMock());
    merge(this, data);
    return data;
  }
}
