import Route from './data/entities/route';
import User from './data/models/user';
import Post from './data/models/post';
import Comment from './data/models/comment';

const routes = {
  users: new Route('users', User),
  posts: new Route('posts', Post),
  comments: new Route('comments', Comment)
};

export default routes;
