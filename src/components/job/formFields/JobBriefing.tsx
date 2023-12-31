"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const JobBriefing = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  const [generatedBriefing, setGeneratedBriefing] = useState(0);
  const { completion, stop, complete, isLoading } = useCompletion({
    api: "/api/generateai",
    onFinish: async () => {
      setGeneratedBriefing(1);
    },
  });
  const prompt = `Erstelle mir eine für Bewerber ansprechende Stellenbeschreibung in ${form.getValues(
    "speech"
  )} Form! Mit maximal 100 Wörtern für einen ${form.getValues(
    "name"
  )}. Füge einige klassische Aufgaben für diesen Beruf ein. Gib mir eine sauber strukturierte Antwort zurück. Beginne direkt und füge keine Überschrift ein.`;
  // console.log(form.watch());

  useEffect(() => {
    // console.log("Änderung");
    form.setValue("briefing", completion);
  }, [completion]);

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
                  content={completion}
                  // placeholder="Erzähl etwas über die Aufgaben in diesem Job"
                  {...field}
                  defaultValue={completion}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {generatedBriefing === 0 && (
          <Button
            className="mt-2 w-full"
            disabled={isLoading}
            type="button"
            onClick={() => complete(prompt)}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Erstelle die Beschreibung für mich"
            )}
          </Button>
        )}
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

export default JobBriefing;
