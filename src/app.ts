import express, { Request, Response } from 'express';
import { config } from './config.ts';
import { database } from './database/client.ts';
import { errorMiddleware } from './middleware/error.middleware.ts';
import { PostController } from './posts/post.controller.ts';
import { DatabasePostRepository } from './posts/post.database.repository.ts';
import { PostService } from './posts/post.service.ts';

const app = express();
app.use(express.json());
app.use('/posts', new PostController(new PostService(new DatabasePostRepository(database))).router);

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'route not found' } });
});

app.use(errorMiddleware);

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
