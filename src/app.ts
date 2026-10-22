import express, { Request, Response, NextFunction } from 'express';
import { config } from './config.ts';
import { database } from './database/client.ts';
import { errorMiddleware } from './middleware/error.middleware.ts';
import { PostController } from './posts/PostController.ts';
import { PostRepository } from './posts/PostRepository.ts';
import { PostService } from './posts/PostService.ts';

const app = express();
app.use(express.json());

app.get('/', (_: Request, response: Response) => {
  response.send({ message: 'Welcome to the Mocking Katas API' });
});

const repository = new PostRepository(database);
const service = new PostService(repository);
const router = new PostController(service).router;
app.use('/posts', router);

app.use((_request: Request, response: Response, _next: NextFunction) => {
  response.status(404).send('Page not found');
});

app.use(errorMiddleware);

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
