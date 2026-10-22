import { NewPost, Post } from './post.model.js';
import { PostRepository } from './post.repository.js';

export class PostService {
  constructor(private readonly repository: PostRepository) {}

  findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  create(post: NewPost): Promise<Post> {
    return this.repository.create(post);
  }

  delete(id: number): Promise<Post | undefined> {
    return this.repository.delete(id);
  }
}
