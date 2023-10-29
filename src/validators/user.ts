import { z } from "zod";

export const addUserDetails = z.object({
  firstName: z
    .string()
    .min(2, "Bitte gib einen Vornamen ein")
    .max(50, "Dein Vorname ist zu lang"),
  lastName: z
    .string()
    .min(2, "Bitte gib einen Nachnamen ein")
    .max(50, "Dein Nachname ist zu lang"),
});

export const editUserNamesSchema = z.object({
  firstName: z
    .string()
    .min(2, "Bitte gib einen Vornamen ein")
    .max(50, "Dein Vorname ist zu lang"),
  lastName: z
    .string()
    .min(2, "Bitte gib einen Nachnamen ein")
    .max(50, "Dein Nachname ist zu lang"),
});

export const loginUserSchema = z.object({
  email: z
    .string()
    .email({ message: "Bitte gib eine gültige E-Mail an." })
    .max(100, "Deine E-Mail erscheint uns etwas lang...")
    .min(5, "Deine E-Mail erscheint uns etwas kurz..."),
});
