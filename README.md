# Mocking Katas

Small TypeScript exercises on mocking and dependency injection: a `VideoService` reads a video title through a `Reader` interface, backed by a real file reader in the app and a fake in tests.

## Getting started

Requires Node 24 and pnpm 11.

```sh
pnpm install
pnpm dev        # run src/app.ts with tsx
pnpm test       # run vitest
pnpm typecheck  # tsc --noEmit
pnpm build      # bundle to dist/ with esbuild
pnpm start      # run the bundle
```
