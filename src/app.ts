import express from 'express';
import { config } from './config.js';
import { db } from './db/client.js';
import { videoRouter } from './videos/video.controller.js';
import { DrizzleVideoRepository } from './videos/video.repository.js';
import { VideoService } from './videos/video.service.js';

const app = express();
app.use(express.json());
app.use('/videos', videoRouter(new VideoService(new DrizzleVideoRepository(db))));

app.listen(config.port, () => console.log(`Listening on http://localhost:${config.port}`));
