import { Request, Response, Router } from 'express';
import { createPostSchema, postIdSchema } from './post.schema.ts';
import { PostService } from './post.service.ts';
import { parseRequest } from '../validation.ts';

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
    const post = parseRequest(createPostSchema, request.body);
    response.status(201).send(await this.service.create(post));
  }

  async delete(request: Request, response: Response) {
    const { id } = parseRequest(postIdSchema, request.params);

    const deleted = await this.service.delete(id);
    if (!deleted) {
      response.status(404).send({ error: { code: 'NOT_FOUND', message: 'post not found' } });
      return;
    }

    response.send(deleted);
  }

  async deleteAll(_: Request, response: Response) {
    response.send(await this.service.deleteAll());
  }
}
