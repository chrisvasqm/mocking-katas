import express, { NextFunction, Request, Response } from 'express';
import { config } from './config.js';
import { db } from './db/client.js';
import { postRouter } from './posts/post.controller.js';
import { DrizzlePostRepository } from './posts/post.repository.js';
import { PostService } from './posts/post.service.js';

const app = express();
app.use(express.json());
app.use('/posts', postRouter(new PostService(new DrizzlePostRepository(db))));

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'route not found' } });
});

app.use((error: Error & { status?: number }, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);

  const status = error.status ?? 500;
  if (status < 500) {
    res.status(status).json({ error: { code: 'BAD_REQUEST', message: error.message } });
    return;
  }

  console.error(error);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } });
});

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
