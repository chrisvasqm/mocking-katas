import express, { Request, Response } from 'express';
import { config } from './config.ts';
import { database } from './database/client.ts';
import { errorMiddleware } from './middleware/error.middleware.ts';
import { PostController } from './posts/post.controller.ts';
import { DatabasePostRepository } from './posts/post.database.repository.ts';
import { PostService } from './posts/post.service.ts';
import { InMemoryUserRepository } from './users/user.memory.repository.ts';

const app = express();
app.use(express.json());

app.get('/', (_: Request, response: Response) => {
  response.send({ message: 'Welcome to the Mocking Katas API' });
});

app.use('/posts', new PostController(new PostService(new DatabasePostRepository(database), new InMemoryUserRepository())).router);

app.use((_: Request, response: Response) => {
  response.status(404).send({ error: { code: 'NOT_FOUND', message: 'route not found' } });
});

app.use(errorMiddleware);

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
