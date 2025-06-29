import z from "zod";

/**
 * Utility Type to help with creating form states for the useActionState hook.
 */
export type ZodFormState<FormInputSchema extends z.ZodObject<z.ZodRawShape>> =
  | {
      errors?: Record<keyof FormInputSchema['shape'], string[]>;
      message?: string;
    }
  | undefined;
