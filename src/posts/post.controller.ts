import { Request, Response, Router } from 'express';
import { z } from 'zod';
import { createPostSchema, postIdSchema } from './post.schema.ts';
import { PostService } from './post.service.ts';

export class PostController {
  readonly router = Router();

  constructor(private readonly service: PostService) {
    this.router.get('/', this.findAll.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.delete('/', this.deleteAll.bind(this));
    this.router.delete('/:id', this.delete.bind(this));
  }

  async findAll(_: Request, response: Response) {
    response.send(await this.service.findAll());
  }

  async create(request: Request, response: Response) {
    const result = createPostSchema.safeParse(request.body);
    if (!result.success)
      return response.status(400).send({ error: { code: 'VALIDATION_ERROR', message: 'request is invalid', details: z.flattenError(result.error) } });

    const created = await this.service.create(result.data);

    response.status(201).send(created);
  }

  async delete(request: Request, response: Response) {
    const result = postIdSchema.safeParse(request.params);
    if (!result.success)
      return response.status(400).send({ error: { code: 'VALIDATION_ERROR', message: 'request is invalid', details: z.flattenError(result.error) } });

    const deleted = await this.service.delete(result.data.id);
    if (!deleted)
      return response.status(404).send('Post not found.');

    response.send(deleted);
  }

  async deleteAll(_: Request, response: Response) {
    const deleted = await this.service.deleteAll();
    response.send(deleted);
  }
}
