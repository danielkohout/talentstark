import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const JobBriefing = ({ formStep, setFormStep, form }: JobFieldInterface) => {
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
