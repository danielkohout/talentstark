import { z } from "zod";

export const addCompanySchema = z.object({
  name: z.string().min(3, "Bitte gib einen Unternehmensnamen ein.").max(255),
  street: z.string().min(3, "Bitte gib eine gültige Straße ein").max(255),
  postcode: z
    .string()
    .min(3, "Bitte gib eine gültige Postleitzahl ein")
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Die Postleitzahl muss aus Zahlen bestehen.",
    }),
  city: z.string().min(2, "Bitte gib eine gültige Stadt ein").max(40),
  country: z.string().min(1).max(10),
});

export const editCompanySchema = z.object({
  name: z.string().min(3, "Bitte gib einen Unternehmensnamen ein.").max(255),
  street: z.string().min(3, "Bitte gib eine gültige Straße ein").max(255),
  postcode: z
    .string()
    .min(3, "Bitte gib eine gültige Postleitzahl ein")
    .max(10)
    .refine((val) => !isNaN(val as unknown as number), {
      message: "Die Postleitzahl muss aus Zahlen bestehen.",
    }),
  city: z.string().min(2, "Bitte gib eine gültige Stadt ein").max(40),
  country: z.string().min(1).max(10),
});
