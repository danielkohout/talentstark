import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const JobBenefits = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  return (
    <>
      <motion.div
        className={cn("absolute left-0 right-0 top-0 p-1", {
          hidden: formStep == 0,
        })}
        animate={{
          translateX: `${600 - formStep * 100}%`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Benefits</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={15}
                  placeholder="Erzähl, warum dieser so interessant ist und was dein Unternehmen Mitarbeitern bietet."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <Button
        type="button"
        variant={"ghost"}
        className={cn("absolute bottom-0 right-0", {
          hidden: formStep != 6,
        })}
        onClick={() => {
          form.trigger(["mail"]);
          const nameState = form.getFieldState("mail");
          if (!nameState.isDirty || nameState.invalid) return;
          setFormStep(formStep + 1);
        }}
      >
        Weiter
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </>
  );
};

export default JobBenefits;
