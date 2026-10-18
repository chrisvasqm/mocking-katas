import FakeFileReader from './fake-file-reader.js';
import { VideoService } from './video.service.js';

const service = new VideoService(new FakeFileReader());
console.log(await service.readTitle("video.txt"));
