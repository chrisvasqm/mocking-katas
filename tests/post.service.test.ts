import { describe, expect, it } from 'vitest';
import { EqualMatchingInjectorConfig, Mock, Times } from 'moq.ts';
import { CreatePost, Post } from '../src/posts/post.model.ts';
import { IPostRepository } from '../src/posts/IPostRepository.ts';
import { PostService } from '../src/posts/PostService.ts';

const newPost: CreatePost = {
  username: 'mosh',
  image_url: 'https://picsum.photos/id/237/1080/1080',
  caption: 'Mocking with Mosh',
};
const post: Post = {
  id: '0b0b4f1e-3c2a-4d6e-9f8a-1b2c3d4e5f60',
  username: 'mosh',
  image_url: 'https://picsum.photos/id/237/1080/1080',
  caption: 'Mocking with Mosh',
  reach: 1,
  created_at: new Date('2026-10-21T12:00:00Z'),
};

describe('PostService', () => {
  it('gets all posts', async () => {
    const repository = new Mock<IPostRepository>()
      .setup(instance => instance.findAll())
      .returnsAsync([post]);
    const service = new PostService(repository.object());

    const result = await service.findAll();

    expect(result).toEqual([post]);
    repository.verify(instance => instance.findAll(), Times.Once());
  });

  it('creates a post with full reach for a premium user', async () => {
    const repository = new Mock<IPostRepository>({ injectorConfig: new EqualMatchingInjectorConfig() })
      .setup(instance => instance.create({ ...newPost, reach: 1 }))
      .returnsAsync(post);
    const service = new PostService(repository.object());

    const result = await service.create(newPost, { isPremium: true });

    expect(result).toEqual(post);
    repository.verify(instance => instance.create({ ...newPost, reach: 1 }), Times.Once());
  });

  it('creates a post with reduced reach for a regular user', async () => {
    const repository = new Mock<IPostRepository>({ injectorConfig: new EqualMatchingInjectorConfig() })
      .setup(instance => instance.create({ ...newPost, reach: 0.7 }))
      .returnsAsync({ ...post, reach: 0.7 });
    const service = new PostService(repository.object());

    const result = await service.create(newPost, { isPremium: false });

    expect(result.reach).toBe(0.7);
    repository.verify(instance => instance.create({ ...newPost, reach: 0.7 }), Times.Once());
  });

  it('deletes a post', async () => {
    const repository = new Mock<IPostRepository>()
      .setup(instance => instance.delete(post.id))
      .returnsAsync(post);
    const service = new PostService(repository.object());

    const result = await service.delete(post.id);

    expect(result).toEqual(post);
    repository.verify(instance => instance.delete(post.id), Times.Once());
  });
});
