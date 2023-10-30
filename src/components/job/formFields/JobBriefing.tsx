import { trpc } from "@/app/_trpc/client";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

const JobBriefing = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  const { mutate: generateBriefingAI, isLoading } =
    trpc.jobRouter.generateBriefingAI.useMutation({
      onMutate: () => {
        form.setValue(
          "briefing",
          "Wir erstellen gerade dein Briefing... Dies kann kurz dauern... Bitte gedulde dich ein wenig."
        );
      },
      onSuccess: (result) => {
        if (result?.choices[0].message.content) {
          form.setValue("briefing", result?.choices[0].message.content);
        }
      },
    });

  return (
    <>
      <motion.div
        className={cn("absolute left-0 right-0 top-0 p-1", {
          hidden: formStep == 0,
        })}
        animate={{
          translateX: `${500 - formStep * 100}%`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <h2 className="pb-2 font-bold">Bewerber Informationen</h2>
        <FormField
          control={form.control}
          name="briefing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Beschreibung</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  rows={15}
                  placeholder="Erzähl etwas über die Aufgaben in diesem Job"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={buttonVariants({
            variant: "default",
            className: "mt-2 w-full cursor-pointer",
          })}
          onClick={() =>
            generateBriefingAI({
              prompt: `Erstelle mir eine ansprechende Stellenbeschreibung mit maximal 300 Zeichen für folgenden Beruf: ${form.getValues(
                "name"
              )}. Sauber strukturiert mit klaren Absätzen und passenden Überschriften, ansprechend für Bewerber und gern mit Emojis aber nicht zu vielen sondern gut eingesetzt. Lasse jegliche Art von Handlungsaufforderung am Ende weg. Baue keine leeren platzhalter ein und auch keine hashtags.`,
            })
          }
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Erstelle mir das Briefing"
          )}
        </div>
      </motion.div>
      <Button
        type="button"
        variant={"ghost"}
        className={cn("absolute bottom-0 right-0", {
          hidden: formStep != 5,
        })}
        onClick={() => {
          form.trigger(["briefing"]);
          const nameState = form.getFieldState("briefing");
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

export default JobBriefing;
