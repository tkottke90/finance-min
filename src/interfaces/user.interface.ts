import z from "zod";

export const UpdateUserDetailsSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email()
});

export type UpdateUserDetails = z.infer<typeof UpdateUserDetailsSchema>;
