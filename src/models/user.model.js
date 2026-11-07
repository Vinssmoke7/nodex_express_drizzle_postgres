import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { users } from '../db/schema.js';

export const UserModel = {
  findAll: async () => {
    return await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);
  },

  findById: async (id) => {
    const [user] = await db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id));
    return user || null;
  },

  findByEmail: async (email) => {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return user || null;
  },

  create: async (data) => {
    const [user] = await db
      .insert(users)
      .values(data)
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        createdAt: users.createdAt,
      });
    return user;
  },

  update: async (id, data) => {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        email: users.email,
        name: users.name,
        updatedAt: users.updatedAt,
      });
    return user || null;
  },

  delete: async (id) => {
    const [user] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });
    return user || null;
  },
};