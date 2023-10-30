import { z } from "zod";

export const addJobSchema = z.object({
  name: z
    .string()
    .min(5, "Der Jobname sollte mindestens 5 Zeichen lang sein.")
    .max(255, "Der Jobname sollte kürzer als 255 Zeichen lang sein."),
  team: z.string().min(1, "Bitte wähle ein Team"),
  type: z.string(),
  mail: z.string().email({ message: "Bitte gib eine gültige E-Mail an." }),
  speech: z.string(),
  briefing: z.string(),
  benefits: z.string(),
});
