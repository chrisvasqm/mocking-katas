import { Router } from 'express';
import { VideoService } from './video.service.js';

const MAX_INT = 2_147_483_647;

const isPositiveInt = (value: unknown): value is number =>
  Number.isInteger(value) && (value as number) > 0 && (value as number) <= MAX_INT;

export function videoRouter(service: VideoService) {
  const router = Router();

  router.post('/', async (req, res) => {
    const { title, description, duration } = req.body ?? {};
    if (typeof title !== 'string' || typeof description !== 'string' || !isPositiveInt(duration)) {
      res.status(400).json({
        error: { code: 'VALIDATION_ERROR', message: 'title, description and a positive integer duration are required' },
      });
      return;
    }

    res.status(201).json(await service.create({ title, description, duration }));
  });

  router.delete('/:id', async (req, res) => {
    const id = /^\d+$/.test(req.params.id) ? Number(req.params.id) : NaN;
    if (!isPositiveInt(id)) {
      res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'id must be a positive integer' } });
      return;
    }

    const deleted = await service.delete(id);
    if (!deleted) {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'video not found' } });
      return;
    }

    res.sendStatus(204);
  });

  return router;
}
