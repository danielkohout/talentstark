import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { addJobSchema } from "@/validators/job";

export interface JobFieldInterface {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
  form: UseFormReturn<z.infer<typeof addJobSchema>>;
  isLoading?: boolean;
}
