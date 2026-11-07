import { eq } from 'drizzle-orm';
import { db } from '../config/db.js';
import { pets } from '../db/schema.js';

export const PetModel = {
  findAll: async () => {
    return await db.query.pets.findMany({
      with: {
        createdBy: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
        updatedBy: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  },

  findById: async (id) => {
    const pet = await db.query.pets.findFirst({
      where: eq(pets.id, id),
      with: {
        createdBy: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
        updatedBy: {
          columns: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    return pet || null;
  },

  create: async (data) => {
    const [pet] = await db.insert(pets).values(data).returning();
    return pet;
  },

  update: async (id, data) => {
    const [pet] = await db
      .update(pets)
      .set(data)
      .where(eq(pets.id, id))
      .returning();
    return pet || null;
  },

  delete: async (id) => {
    const [pet] = await db
      .delete(pets)
      .where(eq(pets.id, id))
      .returning({ id: pets.id });
    return pet || null;
  },
};