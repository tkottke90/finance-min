import { User as Prisma__User } from "@/lib/prisma";
import { z } from "zod";
import { ZodPrisma } from "../utils/type.utils";

type UserPrisma = ZodPrisma<Prisma__User>;

export const UserSchema = z
  .object<UserPrisma>({
    id: z.number(),
    name: z.string(),
    uuid: z.string().uuid(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .required();

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateUserSchema = CreateUserSchema.partial();

export type User = Required<z.infer<typeof UserSchema>>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
