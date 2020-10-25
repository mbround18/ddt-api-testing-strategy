import BaseModel from './base';
import { name } from 'faker';

interface IUser {
  id: number;
  name: string;
}

export default class User extends BaseModel<IUser> implements Partial<IUser> {
  public async generateMock(): Promise<Partial<IUser>> {
    return {
      name: name.findName()
    };
  }
}
