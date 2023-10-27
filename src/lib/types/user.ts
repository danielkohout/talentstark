import z from "zod";

export const editUserSchema = z.object({
  firstName: z
    .string()
    .max(
      50,
      "Dein Vorname erscheint uns etwas lang. Bitte wende dich an den Support"
    ),
  lastName: z
    .string()
    .max(
      50,
      "Dein Nachname erscheint uns etwas lang. Bitte wende dich an den Support"
    ),
});

export type editUserSchema = z.infer<typeof editUserSchema>;
