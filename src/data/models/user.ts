import BaseModel from './base';
import { name } from 'faker';
import * as data from '../../db.json';
import { merge } from 'lodash';

interface IUser {
  id: number;
  name: string;
}

export default class User extends BaseModel<IUser> implements Partial<IUser> {
  constructor() {
    super();
    this.collection = data.users;
  }

  public generateMock(): Partial<IUser> {
    return {
      name: name.findName()
    };
  }
}
