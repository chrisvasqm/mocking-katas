import { Router } from 'express';
import { PostService } from './post.service.js';

const MAX_INT = 2_147_483_647;

const MAX_USERNAME = 30;
const MAX_URL = 2048;
const MAX_CAPTION = 2200;

const isUsername = (value: unknown): value is string =>
  typeof value === 'string' && value.trim() !== '' && value.trim().length <= MAX_USERNAME;

const isHttpUrl = (value: unknown): value is string =>
  typeof value === 'string' &&
  value.length <= MAX_URL &&
  URL.canParse(value) &&
  ['http:', 'https:'].includes(new URL(value).protocol);

const isCaption = (value: unknown): value is string => typeof value === 'string' && value.length <= MAX_CAPTION;

export function postRouter(service: PostService) {
  const router = Router();

  router.get('/', async (_req, res) => {
    res.json(await service.findAll());
  });

  router.post('/', async (req, res) => {
    const { username, imageUrl, caption = '' } = req.body ?? {};
    if (!isUsername(username) || !isHttpUrl(imageUrl) || !isCaption(caption)) {
      res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: `username (max ${MAX_USERNAME}) and an http(s) imageUrl are required; caption max ${MAX_CAPTION}` },
      });
      return;
    }

    res.status(201).json(await service.create({ username: username.trim(), imageUrl, caption }));
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

    res.json(deleted);
  });

  return router;
}
