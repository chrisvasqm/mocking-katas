# Mocking Katas

TypeScript exercises on mocking and dependency injection of external dependencies.

A small Instagram-style feed backend (Express, no auth) that creates and deletes posts, split into layers:

| Layer | File |
|---|---|
| Controller (router) | `src/posts/post.controller.ts` |
| Service | `src/posts/post.service.ts` |
| Repository | `src/posts/post.repository.ts` |
| Model | `src/posts/post.model.ts` |
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
curl -X POST localhost:3000/posts -H 'content-type: application/json' \
  -d '{"username":"mosh","imageUrl":"https://picsum.photos/id/237/1080/1080","caption":"Mocking with Mosh"}'  # 201 + post
curl -X DELETE localhost:3000/posts/1                                                                      # 204, or 404
```
