import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { createPostSchema, postIdSchema } from './post.schema.ts';
import { PostService } from './PostService.ts';

export class PostController {
  readonly router = Router();

  constructor(private readonly service: PostService) {
    this.router.get('/', this.findAll.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.delete('/', this.deleteAll.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  async findAll(_: Request, response: Response) {
    const posts = await this.service.findAll();

    response.send(posts);
  }

  async create(request: Request, response: Response) {
    const validation = createPostSchema.safeParse(request.body);
    if (!validation.success)
      return response.status(400).send(z.flattenError(validation.error));

    const { is_premium, ...post } = validation.data;
    const created = await this.service.create(post, { isPremium: is_premium });

    response.status(201).send(created);
  }

  async delete(request: Request, response: Response) {
    const validation = postIdSchema.safeParse(request.params);
    if (!validation.success)
      return response.status(400).send(z.flattenError(validation.error));

    const deleted = await this.service.delete(validation.data.id);
    if (!deleted)
      return response.status(404).send('Post not found.');

    response.send(deleted);
  }

  async deleteAll(_: Request, response: Response) {
    const deleted = await this.service.deleteAll();

    response.send(deleted);
  }
}
