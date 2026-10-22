import { desc, eq } from 'drizzle-orm';
import { Database } from '../db/client.js';
import { posts } from '../db/schema.js';
import { NewPost, Post } from './post.model.js';

export interface PostRepository {
  findAll(): Promise<Post[]>;
  create(post: NewPost): Promise<Post>;
  delete(id: number): Promise<Post | undefined>;
}

export class DrizzlePostRepository implements PostRepository {
  constructor(private readonly db: Database) {}

  findAll(): Promise<Post[]> {
    return this.db.select().from(posts).orderBy(desc(posts.createdAt), desc(posts.id));
  }

  async create(post: NewPost): Promise<Post> {
    const [created] = await this.db.insert(posts).values(post).returning();
    return created!;
  }

  async delete(id: number): Promise<Post | undefined> {
    const [deleted] = await this.db.delete(posts).where(eq(posts.id, id)).returning();
    return deleted;
  }
}
