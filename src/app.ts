import express, { NextFunction, Request, Response } from 'express';
import { config } from './config.js';
import { db } from './db/client.js';
import { postRouter } from './posts/post.controller.js';
import { DrizzlePostRepository } from './posts/post.repository.js';
import { PostService } from './posts/post.service.js';
import { RequestValidationError } from './validation.js';

const app = express();
app.use(express.json());
app.use('/posts', postRouter(new PostService(new DrizzlePostRepository(db))));

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'route not found' } });
});

app.use((error: Error & { status?: number }, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(error);

  if (error instanceof RequestValidationError) {
    res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: error.message, details: error.details } });
    return;
  }

  const status = error.status ?? 500;
  if (status === 413) {
    res.status(413).json({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'request body is too large' } });
    return;
  }
  if (status === 415) {
    res.status(415).json({ error: { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'request body encoding is not supported' } });
    return;
  }
  if (status < 500) {
    res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'request body is not valid JSON' } });
    return;
  }

  console.error(error);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } });
});

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
