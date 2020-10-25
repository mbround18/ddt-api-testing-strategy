import { get, first } from 'lodash';

export default class BaseModel<T> {
  [k: string]: any;

  public id?: number;
  public collection: T[];

  public findOne(opts?: Partial<T>): undefined | T {
    return first(this.findBy(opts));
  }

  public findBy(opts?: Partial<T>): undefined | T[] {
    return this.collection.filter(
      user =>
        // If no options are provided, return all
        !opts ||
        // if options are provided match options to user data and return a match based on options provided.
        Object.keys(opts).every(
          searchParam =>
            get(user, searchParam, 'Not found on user') ===
            get(opts, searchParam, 'Not found on opts')
        )
    );
  }

  public generate() {
    throw new Error('Not yet implemented!');
  }
}
