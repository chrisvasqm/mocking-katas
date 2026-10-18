import { Video } from './video.js';
import FileReader from './file-reader.js';
import { Reader } from './reader.js';

export class VideoService {

  constructor(private readonly reader: Reader = new FileReader()) {}

  async readTitle(path: string) {
    const file = await this.reader.read(path);
    const json = JSON.parse(file) as Video;

    return json.title;
  }
}
