import { Post, NewPost } from './post.model.js';


export interface PostRepository {
  findAll(): Promise<Post[]>;
  create(post: NewPost): Promise<Post>;
  delete(id: string): Promise<Post | undefined>;
  deleteAll(): Promise<Post[]>;
}
