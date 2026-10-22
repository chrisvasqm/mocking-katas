import { Router } from 'express';
import { PostService } from './post.service.js';

const MAX_INT = 2_147_483_647;

const isNonEmptyString = (value: unknown): value is string => typeof value === 'string' && value.trim() !== '';

const isHttpUrl = (value: unknown): value is string =>
  typeof value === 'string' && URL.canParse(value) && ['http:', 'https:'].includes(new URL(value).protocol);

export function postRouter(service: PostService) {
  const router = Router();

  router.post('/', async (req, res) => {
    const { username, imageUrl, caption = '' } = req.body ?? {};
    if (!isNonEmptyString(username) || !isHttpUrl(imageUrl) || typeof caption !== 'string') {
      res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'username and an http(s) imageUrl are required; caption must be text' },
      });
      return;
    }

    res.status(201).json(await service.create({ username, imageUrl, caption }));
  });

  router.delete('/:id', async (req, res) => {
    const id = /^\d+$/.test(req.params.id) ? Number(req.params.id) : NaN;
    if (!Number.isInteger(id) || id <= 0 || id > MAX_INT) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'id must be a positive integer' } });
      return;
    }

    const deleted = await service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'post not found' } });
      return;
    }

    res.sendStatus(204);
  });

  return router;
}
