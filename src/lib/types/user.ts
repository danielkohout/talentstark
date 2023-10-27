import z from "zod";

export const editUserSchema = z.object({
  firstName: z.string().max(100, "Vorname ist zu lang"),
  lastName: z.string().max(100, "Nachname ist zu lang"),
});

export type editUserSchema = z.infer<typeof editUserSchema>;
