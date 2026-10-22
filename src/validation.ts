import { z } from 'zod';

export class RequestValidationError extends Error {
  constructor(readonly details: { formErrors: string[]; fieldErrors: Record<string, string[] | undefined> }) {
    super('request is invalid');
  }
}

export function parseRequest<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) throw new RequestValidationError(z.flattenError(result.error));
  return result.data;
}
