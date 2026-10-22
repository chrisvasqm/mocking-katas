import express, { NextFunction, Request, Response } from 'express';
import { config } from './config.js';
import { db } from './db/client.js';
import { videoRouter } from './videos/video.controller.js';
import { DrizzleVideoRepository } from './videos/video.repository.js';
import { VideoService } from './videos/video.service.js';

const app = express();
app.use(express.json());
app.use('/videos', videoRouter(new VideoService(new DrizzleVideoRepository(db))));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } });
});

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
