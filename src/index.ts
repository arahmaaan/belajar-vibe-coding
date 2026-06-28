import { Elysia } from 'elysia';
import { userRoutes } from './routes/users';

const app = new Elysia()
  .use(userRoutes)
  .get('/', () => ({ message: 'Hello from Bun + ElysiaJS + Drizzle + MySQL REST API!' }))
  .listen(Number(process.env.PORT) || 3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
