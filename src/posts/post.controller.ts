import { Request, Response, Router } from 'express';
import { createPostSchema, postIdSchema } from './post.schema.ts';
import { PostService } from './post.service.ts';
import { parseRequest } from '../validation.ts';

export class PostController {
  readonly router = Router();

  constructor(private readonly service: PostService) {
    this.router.get('/', this.findAll);
    this.router.post('/', this.create);
    this.router.delete('/', this.deleteAll);
    this.router.delete('/:id', this.delete);
  }

  readonly findAll = async (_: Request, response: Response) => {
    response.json(await this.service.findAll());
  };

  readonly create = async (request: Request, response: Response) => {
    const post = parseRequest(createPostSchema, request.body);
    response.status(201).json(await this.service.create(post));
  };

  readonly delete = async (request: Request, response: Response) => {
    const { id } = parseRequest(postIdSchema, request.params);

    const deleted = await this.service.delete(id);
    if (!deleted) {
      response.status(404).json({ error: { code: 'NOT_FOUND', message: 'post not found' } });
      return;
    }

    response.json(deleted);
  };

  readonly deleteAll = async (_: Request, response: Response) => {
    response.json(await this.service.deleteAll());
  };
}
