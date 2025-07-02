# Bun TypeScript Express Prisma Zod Base Template

A modern, minimal boilerplate for building scalable Node.js APIs using:

- [Bun](https://bun.sh/) for fast runtime and package management
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Express](https://expressjs.com/) for routing
- [Prisma](https://www.prisma.io/) for database ORM
- [Zod](https://zod.dev/) for schema validation

## Author

Ali Sabet

## Features

- **Bun** as the runtime and package manager
- **TypeScript** for static typing
- **Express** for HTTP server and routing
- **Prisma** for database access
- **Zod** for request/response validation
- Modular folder structure for scalability
- Centralized error handling and async utilities

## Project Structure

```
bun.lock
package.json
tsconfig.json
prisma/
  schema.prisma
src/
  app.ts
  index.ts
  constants/
    index.ts
  core/
    index.ts
  db/
    index.ts
  errors/
    index.ts
  middlewares/
    error/
      global-error-handler.ts
    validate/
      request-validate-types.ts
      request-validate.ts
  routes/
    index.ts
  schemas/
    test.schema.ts
  services/
  types/
    index.ts
  utils/
    catch-async.ts
    errors/
      app-error.ts
      format-prisma-error.ts
```

## Getting Started

1. **Install dependencies**
   ```sh
   bun install
   ```
2. **Setup your database**
   - Edit `prisma/schema.prisma` as needed
   - Run Prisma migrations:
     ```sh
     bunx prisma migrate dev
     ```
3. **Start the development server**
   ```sh
   bun run src/index.ts
   ```

## Scripts

- `bun run src/index.ts` — Start the server
- `bunx prisma migrate dev` — Run database migrations

## License

MIT
