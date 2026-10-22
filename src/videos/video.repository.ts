import { eq } from 'drizzle-orm';
import { Database } from '../db/client.js';
import { videos } from '../db/schema.js';
import { NewVideo, Video } from './video.model.js';

export interface VideoRepository {
  create(video: NewVideo): Promise<Video>;
  delete(id: number): Promise<Video | undefined>;
}

export class DrizzleVideoRepository implements VideoRepository {
  constructor(private readonly db: Database) {}

  async create(video: NewVideo): Promise<Video> {
    const [created] = await this.db.insert(videos).values(video).returning();
    return created!;
  }

  async delete(id: number): Promise<Video | undefined> {
    const [deleted] = await this.db.delete(videos).where(eq(videos.id, id)).returning();
    return deleted;
  }
}
