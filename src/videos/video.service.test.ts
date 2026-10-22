import { describe, expect, it } from 'vitest';
import { It, Mock, Times } from 'moq.ts';
import { NewVideo, Video } from './video.model.js';
import { VideoRepository } from './video.repository.js';
import { VideoService } from './video.service.js';

const newVideo: NewVideo = { title: 'Mocking with Mosh', description: 'Sample description', duration: 60 };
const video: Video = { id: 1, ...newVideo };

describe('VideoService', () => {
  it('creates a video', async () => {
    const repository = new Mock<VideoRepository>()
      .setup(instance => instance.create(It.IsAny()))
      .returnsAsync(video);
    const service = new VideoService(repository.object());

    expect(await service.create(newVideo)).toEqual(video);
    repository.verify(instance => instance.create(newVideo), Times.Once());
  });

  it('deletes a video', async () => {
    const repository = new Mock<VideoRepository>()
      .setup(instance => instance.delete(video.id))
      .returnsAsync(video);
    const service = new VideoService(repository.object());

    expect(await service.delete(video.id)).toEqual(video);
    repository.verify(instance => instance.delete(video.id), Times.Once());
  });
});
