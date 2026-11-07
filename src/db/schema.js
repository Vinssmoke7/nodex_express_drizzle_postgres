import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const pets = pgTable('pets', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  species: text('species').notNull(),
  breed: text('breed'),
  age: integer('age'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdById: uuid('created_by_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  updatedById: uuid('updated_by_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
});

export const usersRelations = relations(users, ({ many }) => ({
  createdPets: many(pets, { relationName: 'CreatedPets' }),
  updatedPets: many(pets, { relationName: 'UpdatedPets' }),
}));

export const petsRelations = relations(pets, ({ one }) => ({
  createdBy: one(users, {
    fields: [pets.createdById],
    references: [users.id],
    relationName: 'CreatedPets',
  }),
  updatedBy: one(users, {
    fields: [pets.updatedById],
    references: [users.id],
    relationName: 'UpdatedPets',
  }),
}));
