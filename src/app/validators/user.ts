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
