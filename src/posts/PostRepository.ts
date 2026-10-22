import { desc, eq } from 'drizzle-orm';
import { Database } from '../database/client.ts';
import { posts } from '../database/schema.ts';
import { NewPost, Post } from './post.model.ts';
import { IPostRepository as IPostRepository } from './IPostRepository.ts';

export class PostRepository implements IPostRepository {
  constructor(private readonly database: Database) { }

  findAll(): Promise<Post[]> {
    return this.database.select().from(posts).orderBy(desc(posts.created_at));
  }

  async create(post: NewPost): Promise<Post> {
    const [created] = await this.database.insert(posts).values(post).returning();
    return created!;
  }

  async delete(id: string): Promise<Post | undefined> {
    const [deleted] = await this.database.delete(posts).where(eq(posts.id, id)).returning();
    return deleted;
  }

  deleteAll(): Promise<Post[]> {
    return this.database.delete(posts).returning();
  }
}
