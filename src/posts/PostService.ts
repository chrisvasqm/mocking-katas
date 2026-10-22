import { User } from '../users/user.model.ts';
import { CreatePost, Post } from './post.model.ts';
import { IPostRepository } from './IPostRepository.ts';

export class PostService {
  constructor(private readonly repository: IPostRepository) { }

  findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  create(post: CreatePost, user: User): Promise<Post> {
    const reach = user.isPremium ? 1 : 0.7;
    return this.repository.create({ ...post, reach });
  }

  delete(id: string): Promise<Post | undefined> {
    return this.repository.delete(id);
  }

  deleteAll(): Promise<Post[]> {
    return this.repository.deleteAll();
  }
}
