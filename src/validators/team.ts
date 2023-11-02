import { z } from "zod";

export const addTeamSchema = z.object({
  name: z
    .string()
    .min(2, "Bitte gib einen Teamnamen ein von mindestens zwei Zeichen ein")
    .max(255, "Dein Teamname ist zu lang"),
  street: z.string(),
  city: z.string(),
  postcode: z.string(),
  contactFirstName: z.string(),
  contactLastName: z.string(),
  description: z.string(),
});

export const editTeamSchema = z.object({
  name: z
    .string()
    .min(2, "Bitte gib einen Teamnamen ein von mindestens zwei Zeichen ein")
    .max(255, "Dein Teamname ist zu lang"),
  id: z.string(),
  street: z.string(),
  city: z.string(),
  postcode: z.string(),
  contactFirstName: z.string(),
  contactLastName: z.string(),
  description: z.string(),
});
