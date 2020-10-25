import BaseModel from './base';
import { lorem } from 'faker';
import Post from './post';

interface IComment {
  id: number;
  body: string;
  postId: number;
}

export default class Comment
  extends BaseModel<IComment>
  implements Partial<IComment> {
  public async generateMock(): Promise<Partial<IComment>> {
    const post = await new Post().findOne();
    return {
      body: lorem.paragraphs(2),
      postId: post.id
    };
  }
}
