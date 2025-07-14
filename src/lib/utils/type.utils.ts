import { type ZodTypeAny } from "zod";

/**
 * Utility type to get the return type of an async function.
 */
export type AsyncReturnType<T extends (...args: any) => any> = Awaited<
  ReturnType<T>
>;

/**
 * Utlity type for converting a Prisma Table definition into a Zod Schema
 */
export type ZodPrisma<T extends Record<string, any>> = {
  [K in keyof T]: ZodTypeAny;
};
