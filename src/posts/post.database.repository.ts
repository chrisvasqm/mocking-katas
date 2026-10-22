import { desc, eq } from 'drizzle-orm';
import { Database } from '../db/client.js';
import { posts } from '../db/schema.js';
import { NewPost, Post } from './post.model.js';
import { PostRepository } from './post.repository.interface.js';

export class DatabasePostRepository implements PostRepository {
  constructor(private readonly database: Database) { }

  findAll(): Promise<Post[]> {
    return this.database.select().from(posts).orderBy(desc(posts.created_at), desc(posts.id));
  }

  async create(post: NewPost): Promise<Post> {
    const [created] = await this.database.insert(posts).values(post).returning();
    return created!;
  }

  async delete(id: number): Promise<Post | undefined> {
    const [deleted] = await this.database.delete(posts).where(eq(posts.id, id)).returning();
    return deleted;
  }
}
