import { describe, expect, it } from 'vitest';
import { VideoService } from './video.service.js';
import FakeFileReader from './fake-file-reader.js';

describe('VideoService', () => {
  it('reads the title', async () => {
    const service = new VideoService(new FakeFileReader());

    expect(await service.readTitle('video.text')).toBe('fake title');
  });
});
