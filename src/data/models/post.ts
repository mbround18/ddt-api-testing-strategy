import BaseModel from './base';
import { lorem } from 'faker';
import User from './user';
import * as data from '../../db.json';
import { merge } from 'lodash';

interface IPost {
  id: number;
  title: string;
  userId: number;
  content: string;
}

export default class Post extends BaseModel<IPost> implements Partial<IPost> {
  constructor() {
    super();
    this.collection = data.posts;
  }

  public generate(): Partial<IPost> {
    return {
      title: lorem.sentence(),
      userId: new User().findOne()?.id,
      content: lorem.paragraphs(2)
    };
  }

  public toJson() {}
}
