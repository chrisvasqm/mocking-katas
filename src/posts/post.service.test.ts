import { describe, expect, it } from 'vitest';
import { Mock, Times } from 'moq.ts';
import { NewPost, Post } from './post.model.js';
import { PostRepository } from './post.repository.interface.js';
import { PostService } from './post.service.js';

const newPost: NewPost = {
  username: 'mosh',
  image_url: 'https://picsum.photos/id/237/1080/1080',
  caption: 'Mocking with Mosh',
};
const post: Post = {
  id: 1,
  username: 'mosh',
  image_url: 'https://picsum.photos/id/237/1080/1080',
  caption: 'Mocking with Mosh',
  created_at: new Date('2026-10-21T12:00:00Z'),
};

describe('PostService', () => {
  it('gets all posts', async () => {
    const repository = new Mock<PostRepository>()
      .setup(instance => instance.findAll())
      .returnsAsync([post]);
    const service = new PostService(repository.object());

    expect(await service.findAll()).toEqual([post]);
    repository.verify(instance => instance.findAll(), Times.Once());
  });

  it('creates a post', async () => {
    const repository = new Mock<PostRepository>()
      .setup(instance => instance.create(newPost))
      .returnsAsync(post);
    const service = new PostService(repository.object());

    expect(await service.create(newPost)).toEqual(post);
    repository.verify(instance => instance.create(newPost), Times.Once());
  });

  it('deletes a post', async () => {
    const repository = new Mock<PostRepository>()
      .setup(instance => instance.delete(post.id))
      .returnsAsync(post);
    const service = new PostService(repository.object());

    expect(await service.delete(post.id)).toEqual(post);
    repository.verify(instance => instance.delete(post.id), Times.Once());
  });
});
