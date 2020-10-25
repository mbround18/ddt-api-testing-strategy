import BaseModel from './base';
import { lorem } from 'faker';
import User from './user';
import * as data from '../../db.json';
import { merge } from 'lodash';
import Post from './post';

interface IComment {
  id: number;
  body: string;
  postId: number;
}

export default class Comment
  extends BaseModel<IComment>
  implements Partial<IComment> {
  constructor() {
    super();
    this.collection = data.comments;
  }

  public generate(): Partial<IComment> {
    const comment = {
      body: lorem.paragraphs(2),
      postId: new Post().findOne()?.id
    };
    merge(this, comment);
    return comment;
  }

  public toJson() {}
}
