import BaseModel from './base';
import { lorem } from 'faker';
import User from './user';

interface IPost {
  id: number;
  title: string;
  userId: number;
  content: string;
}

export default class Post extends BaseModel<IPost> implements Partial<IPost> {
  public async generateMock(): Promise<Partial<IPost>> {
    const user = await new User().findOne();
    return {
      title: lorem.sentence(),
      userId: user.id,
      content: lorem.paragraphs(2)
    };
  }
}
