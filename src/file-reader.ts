import { readFile } from 'fs/promises';
import { Reader } from './reader.js';

export default class FileReader implements Reader {
  async read(path: string): Promise<string> {
    return await readFile(path, 'utf-8');
  }
}
