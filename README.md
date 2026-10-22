# Mocking Katas

TypeScript exercises on mocking and dependency injection of external dependencies.

A small Express backend that creates and deletes videos, split into layers:

| Layer | File |
|---|---|
| Controller (router) | `src/videos/video.controller.ts` |
| Service | `src/videos/video.service.ts` |
| Repository | `src/videos/video.repository.ts` |
| Model | `src/videos/video.model.ts` |
| Drizzle schema | `src/db/schema.ts` |

The service tests mock the repository with `moq.ts`, so they need no database.

## Getting started

Requires Node 24, pnpm 11, and Docker.

```sh
pnpm install
cp .env.example .env
docker compose up -d   # Postgres on localhost:5432
pnpm dev               # generate + apply migrations, then run src/app.ts with tsx
pnpm test              # run vitest
pnpm typecheck         # tsc --noEmit
pnpm build             # bundle to dist/ with esbuild
pnpm start             # run the bundle
```

## API

```sh
curl -X POST localhost:3000/videos -H 'content-type: application/json' \
  -d '{"title":"Mocking with Mosh","description":"Sample","duration":60}'   # 201 + video
curl -X DELETE localhost:3000/videos/1                                       # 204, or 404
```
