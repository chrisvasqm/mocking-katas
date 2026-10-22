import { NextFunction, Request, Response } from 'express';

export function errorMiddleware(error: Error & { status?: number }, _: Request, response: Response, next: NextFunction) {
  if (response.headersSent) return next(error);

  const status = error.status ?? 500;
  if (status === 413) {
    response.status(413).send({ error: { code: 'PAYLOAD_TOO_LARGE', message: 'request body is too large' } });
    return;
  }
  if (status === 415) {
    response.status(415).send({ error: { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'request body encoding is not supported' } });
    return;
  }
  if (status < 500) {
    response.status(400).send({ error: { code: 'BAD_REQUEST', message: 'request body is not valid JSON' } });
    return;
  }

  console.error(error);
  response.status(500).send({ error: { code: 'INTERNAL_ERROR', message: 'Something went wrong' } });
}
