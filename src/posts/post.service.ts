import { UserRepository } from '../users/user.repository.interface.ts';
import { NewPost, Post } from './post.model.ts';
import { PostRepository } from './post.repository.interface.ts';

export class PostService {
  constructor(
    private readonly repository: PostRepository,
    private readonly userRepository: UserRepository,
  ) { }

  findAll(): Promise<Post[]> {
    return this.repository.findAll();
  }

  async create(post: NewPost): Promise<Post> {
    const user = await this.userRepository.findByUsername(post.username);
    const reach = user?.isPremium ? 1 : 0.7;
    return this.repository.create({ ...post, reach });
  }

  delete(id: string): Promise<Post | undefined> {
    return this.repository.delete(id);
  }

  deleteAll(): Promise<Post[]> {
    return this.repository.deleteAll();
  }
}
