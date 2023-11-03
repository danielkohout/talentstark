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

export const updateLink = z.object({
  link: z
    .string()
    .min(5, "Bitte gib einen Link ein von mindestens fünf Zeichen ein")
    .max(255, "Dein Link ist zu lang")
    .refine((link) => /^[a-zA-Z0-9-]+$/g.test(link), {
      message:
        "Der Link darf keine Leerzeichen, Sonderzeichen, Umlaute oder andere unzulässige Zeichen enthalten",
      path: [], // path is an empty array as it refers to the value itself
    }),
  id: z.string(),
});
