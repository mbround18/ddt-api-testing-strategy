import { IRead } from './interfaces/iRead';
import { IWrite } from './interfaces/iWrite';

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  // @ts-ignore
  create(item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  update(id: number, item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  delete(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  // @ts-ignore
  find(item: T): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: number): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
