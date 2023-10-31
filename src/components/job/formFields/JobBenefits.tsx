import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const JobBenefits = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  const [generatedBenefits, setGenereatedBenefits] = useState(0);
  const { completion, stop, complete, isLoading } = useCompletion({
    api: "/api/generateai",
    onFinish: async () => {
      setGenereatedBenefits(1);
    },
  });
  const prompt = `Erstelle mir für Bewerber ansprechende Benefits für den Beruf
  ${form.getValues("speech")}.
  Verfassen den Text in ${form.getValues("speech")} Form.
  Verwende passende Emojis.
  `;
  // console.log(form.watch());

  useEffect(() => {
    form.setValue("benefits", completion);
  }, [completion]);
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
        {generatedBenefits === 0 && (
          <Button
            className="mt-2 w-full"
            disabled={isLoading}
            type="button"
            onClick={() => complete(prompt)}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Erstelle die Benefits für mich"
            )}
          </Button>
        )}
      </motion.div>
      <Button
        type="button"
        variant={"ghost"}
        className={cn("absolute bottom-0 right-0", {
          hidden: formStep != 6,
        })}
        onClick={() => {
          form.trigger(["benefits"]);
          const nameState = form.getFieldState("benefits");
          if (nameState.invalid) return;
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
