import { NewPost, Post } from './post.model.ts';
import { PostRepository } from './post.repository.interface.ts';

export class PostService {
  constructor(private readonly repository: PostRepository) { }

  findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  create(post: NewPost): Promise<Post> {
    return this.repository.create(post);
  }

  delete(id: string): Promise<Post | undefined> {
    return this.repository.delete(id);
  }

  deleteAll(): Promise<Post[]> {
    return this.repository.deleteAll();
  }
}
