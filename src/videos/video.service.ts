import { NewVideo, Video } from './video.model.js';
import { VideoRepository } from './video.repository.js';

export class VideoService {
  constructor(private readonly repository: VideoRepository) {}

  create(video: NewVideo): Promise<Video> {
    return this.repository.create(video);
  }

  delete(id: number): Promise<Video | undefined> {
    return this.repository.delete(id);
  }
}
