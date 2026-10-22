import express, { NextFunction, Request, Response } from 'express';
import { config } from './config.js';
import { db } from './db/client.js';
import { postRouter } from './posts/post.controller.js';
import { DrizzlePostRepository } from './posts/post.repository.js';
import { PostService } from './posts/post.service.js';

const app = express();
app.use(express.json());
app.use('/posts', postRouter(new PostService(new DrizzlePostRepository(db))));

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } });
});

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
