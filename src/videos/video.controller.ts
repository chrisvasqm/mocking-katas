import { Router } from 'express';
import { VideoService } from './video.service.js';

export function videoRouter(service: VideoService) {
  const router = Router();

  router.post('/', async (req, res) => {
    const { title, description, duration } = req.body ?? {};
    if (typeof title !== 'string' || typeof description !== 'string' || !Number.isInteger(duration)) {
      res.status(400).json({ error: 'title, description and duration are required' });
      return;
    }

    res.status(201).json(await service.create({ title, description, duration }));
  });

  router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: 'id must be an integer' });
      return;
    }

    const deleted = await service.delete(id);
    res.sendStatus(deleted ? 204 : 404);
  });

  return router;
}
