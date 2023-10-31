"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { useCompletion } from "ai/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Label } from "recharts";

const JobBriefing = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  const { completion, stop, complete, isLoading } = useCompletion({
    api: "/api/generateai",
    onFinish: () => {
      form.setValue("briefing", completion);
    },
  });
  const prompt = `Erstelle mir eine Stellenbeschreibung für einen ${form.getValues(
    "name"
  )}`;

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
        {isLoading && (
          <Dialog defaultOpen={true}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Job Briefing</DialogTitle>
                <DialogDescription>
                  Wir erstellen gerade dein Briefing...
                </DialogDescription>
              </DialogHeader>
              {completion}
              <DialogFooter>
                <Button onClick={stop}>Abbrechen</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        <FormField
          control={form.control}
          name="briefing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Beschreibung</FormLabel>
              <FormControl>
                <Textarea
                  className="resize-none"
                  defaultValue={completion}
                  rows={15}
                  placeholder="Erzähl etwas über die Aufgaben in diesem Job"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="mt-2 w-full"
          disabled={isLoading}
          type="button"
          onClick={() => complete(prompt)}
        >
          Erstelle die Beschreibung für mich
        </Button>
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
