// types/category.ts
import { Category as Prisma__Category } from "@/lib/prisma";
import { z } from "zod";
import { ZodPrisma } from "../utils/type.utils";

const keys /* Readonly<Array<CategoryType>> */ = [
  "CATCH_ALL",
  "VARIABLE",
  "FIXED",
  "GOAL",
] as const;

type CategoryPrisma = ZodPrisma<Prisma__Category>;

export const CategorySchema = z.object<CategoryPrisma>({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  type: z.enum(keys),
  color: z.string().optional(),
  overflowCategoryId: z.number().optional(),
  userId: z.string(),

  balance: z.number().default(0),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateCategorySchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type Category = z.infer<typeof CategorySchema>;
export type CreateCategory = z.infer<typeof CreateCategorySchema>;
