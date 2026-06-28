import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', async () => {
    return await db.select().from(users);
  })
  .get('/:id', async ({ params: { id }, set }) => {
    const userId = Number(id);
    if (isNaN(userId)) {
      set.status = 400;
      return { error: 'Invalid user ID' };
    }
    
    const [user] = await db.select().from(users).where(eq(users.id, userId));
    if (!user) {
      set.status = 404;
      return { error: 'User not found' };
    }
    return user;
  })
  .post('/', async ({ body, set }) => {
    try {
      await db.insert(users).values({
        name: body.name,
        email: body.email,
      });
      return { success: true, message: 'User created' };
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        set.status = 409;
        return { error: 'Email already exists' };
      }
      set.status = 500;
      return { error: err.message || 'Internal server error' };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    })
  })
  .put('/:id', async ({ params: { id }, body, set }) => {
    const userId = Number(id);
    if (isNaN(userId)) {
      set.status = 400;
      return { error: 'Invalid user ID' };
    }

    try {
      await db.update(users)
        .set(body)
        .where(eq(users.id, userId));
      
      return { success: true, message: 'User updated' };
    } catch (err: any) {
      if (err.code === 'ER_DUP_ENTRY') {
        set.status = 409;
        return { error: 'Email already exists' };
      }
      set.status = 500;
      return { error: err.message || 'Internal server error' };
    }
  }, {
    body: t.Partial(t.Object({
      name: t.String(),
      email: t.String(),
    }))
  })
  .delete('/:id', async ({ params: { id }, set }) => {
    const userId = Number(id);
    if (isNaN(userId)) {
      set.status = 400;
      return { error: 'Invalid user ID' };
    }

    await db.delete(users).where(eq(users.id, userId));
    return { success: true, message: 'User deleted' };
  });
