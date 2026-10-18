import { Reader } from './reader.js';

export default class FakeFileReader implements Reader {
  async read(_: string): Promise<string> {
    return `{"title": "fake title"}`;
  }
}