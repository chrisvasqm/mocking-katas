import { Request, Response, Router } from 'express';
import { db } from '../db/client.js';
import { createPostSchema, postIdSchema } from './post.schema.js';
import { DrizzlePostRepository } from './post.repository.js';
import { PostService } from './post.service.js';
import { parseRequest } from '../validation.js';

export class PostController {
  readonly router = Router();

  constructor(private readonly service: PostService) {
    this.router.get('/', this.findAll);
    this.router.post('/', this.create);
    this.router.delete('/:id', this.delete);
  }

  findAll = async (_req: Request, res: Response) => {
    res.json(await this.service.findAll());
  };

  create = async (req: Request, res: Response) => {
    const post = parseRequest(createPostSchema, req.body);
    res.status(201).json(await this.service.create(post));
  };

  delete = async (req: Request, res: Response) => {
    const { id } = parseRequest(postIdSchema, req.params);

    const deleted = await this.service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'post not found' } });
      return;
    }

    res.json(deleted);
  };
}

export const postRouter = new PostController(new PostService(new DrizzlePostRepository(db))).router;
