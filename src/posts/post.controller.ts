import { Router } from 'express';
import { createPostSchema, postIdSchema } from './post.schema.js';
import { PostService } from './post.service.js';
import { parseRequest } from '../validation.js';

export function postRouter(service: PostService) {
  const router = Router();

  router.get('/', async (_req, res) => {
    res.json(await service.findAll());
  });

  router.post('/', async (req, res) => {
    const post = parseRequest(createPostSchema, req.body);
    res.status(201).json(await service.create(post));
  });

  router.delete('/:id', async (req, res) => {
    const { id } = parseRequest(postIdSchema, req.params);

    const deleted = await service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'post not found' } });
      return;
    }

    res.json(deleted);
  });

  return router;
}
