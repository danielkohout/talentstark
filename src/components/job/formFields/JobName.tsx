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
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const JobName = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  return (
    <>
      <motion.div
        className={cn("absolute left-0 right-0 top-0 p-1", {})}
        animate={{
          translateX: `-${formStep * 100}%`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <h2 className="pb-2 font-bold">Allgemeine Informationen</h2>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jobname</FormLabel>
              <FormControl>
                <Input
                  placeholder="Vertiebsmitarbeiter Innendienst (m/w/d)"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Dies ist nachher der Name des Jobs
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <Button
        type="button"
        variant={"ghost"}
        className={cn("absolute bottom-0 right-0", {
          hidden: formStep != 0,
        })}
        onClick={() => {
          form.trigger(["name"]);
          const nameState = form.getFieldState("name");
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

export default JobName;
