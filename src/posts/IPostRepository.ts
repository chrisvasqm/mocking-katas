import { Post, NewPost } from './post.model.ts';


export interface IPostRepository {
  findAll(): Promise<Post[]>;
  create(post: NewPost): Promise<Post>;
  delete(id: string): Promise<Post | undefined>;
  deleteAll(): Promise<Post[]>;
}
