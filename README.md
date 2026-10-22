# Mocking Katas

TypeScript exercises on mocking and dependency injection. The subject is a small Instagram-style feed backend (Express + Postgres, no auth) that lists, creates, and deletes posts. Its layers depend on each other through constructor injection, so the service tests can replace the database with a `moq.ts` mock.

## Getting started

Requires Node 24, pnpm 11, and Docker.

```sh
pnpm install
cp example.env .env
docker compose up -d --wait   # Postgres on localhost:5432
pnpm dev                      # generate + apply migrations, then run src/app.ts with tsx in watch mode
pnpm test                     # run vitest in watch mode
```

## Folder structure

```text
.
├── bruno/                  # Bruno workspace with the API requests
├── drizzle/                # generated SQL migrations
├── src/
│   ├── app.ts              # composition root: wires the layers, error handling, server start
│   ├── config.ts           # reads and checks env vars
│   ├── validation.ts       # parseRequest helper + RequestValidationError
│   ├── db/
│   │   ├── client.ts       # Drizzle instance (connection string)
│   │   └── schema.ts       # Drizzle table definitions
│   └── posts/              # the posts feature, one file per layer
│       ├── post.controller.ts
│       ├── post.schema.ts
│       ├── post.service.ts
│       ├── post.service.test.ts
│       ├── post.repository.ts
│       └── post.model.ts
├── compose.yaml            # local Postgres
├── drizzle.config.ts
└── example.env             # copy to .env
```

## Layers

Each layer has one responsibility (Single Responsibility Principle) and only knows the layer below it.

| Layer | File | Responsibility |
|---|---|---|
| Controller | `src/posts/post.controller.ts` | Maps HTTP to service calls: reads the request, picks the status code, writes the response. |
| Request schema | `src/posts/post.schema.ts` | Defines the valid shape of request bodies and params (Zod). |
| Service | `src/posts/post.service.ts` | Holds the feed's business logic (for example, a post's `reach` from its author's premium status). Depends on the `PostRepository` interface, not on Drizzle. |
| User model | `src/users/user.model.ts` | Dummy `User` type with only `isPremium`, passed to `PostService.create`. |
| Repository | `src/posts/post.repository.ts` | The only code that queries the database (Drizzle). |
| Model | `src/posts/post.model.ts` | The `Post` and `NewPost` types, inferred from the Drizzle schema. |
| Drizzle schema | `src/db/schema.ts` | The `posts` table definition, source for the migrations. |

`src/app.ts` creates the repository, injects it into the service, and injects the service into the controller. Because the service only sees the repository interface, `post.service.test.ts` mocks it with `moq.ts` and needs no database.

## API

A [Bruno](https://www.usebruno.com) workspace lives in `bruno/` (`workspace.yml`), with the **Mocking Feed** collection in `bruno/collections/feed/`. Copy `environments/local.example.yml` to `environments/local.yml` (gitignored) and set `name: local`, then open the workspace and pick the `local` environment (`domain`, `id`). **Create post** stores the new post's id in `id`, so **Delete post** removes that post.

| Method | Path | Description | Responses |
|---|---|---|---|
| `GET` | `/posts` | List all posts, newest first. | `200` + posts |
| `POST` | `/posts` | Create a post. Body: `username` (1–40 chars), `image_url` (http/https URL), `caption` (optional, max 2200 chars), `isPremium` (optional boolean, default `false`). The service sets `reach`: `1` when `isPremium` is `true`, `0.7` otherwise. | `201` + post, `400` invalid body |
| `DELETE` | `/posts` | Delete all posts. | `200` + deleted posts |
| `DELETE` | `/posts/:id` | Delete a post by id (UUID). | `200` + deleted post, `404` not found, `400` invalid id (not a UUID) |

Errors use one shape: `{ "error": { "code", "message", "details" } }` (`details` only on validation errors).

### Get posts

```sh
curl localhost:3000/posts
```

### Create post

```sh
curl -X POST localhost:3000/posts \
  -H 'content-type: application/json' \
  -d '{"username":"mosh","image_url":"https://picsum.photos/id/237/1080/1080","caption":"Mocking with Mosh","isPremium":true}'
```

### Delete post

```sh
curl -X DELETE localhost:3000/posts/1
```
