import { z } from "zod";

export const addTeamSchema = z.object({
  name: z
    .string()
    .min(2, "Bitte gib einen Teamnamen ein von mindestens zwei Zeichen ein")
    .max(255, "Dein Teamname ist zu lang"),
});

export const editTeamSchema = z.object({
  name: z
    .string()
    .min(2, "Bitte gib einen Teamnamen ein von mindestens zwei Zeichen ein")
    .max(255, "Dein Teamname ist zu lang"),
  id: z.string(),
});
