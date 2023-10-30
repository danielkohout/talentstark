import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const JobType = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  return (
    <>
      <motion.div
        className={cn("absolute left-0 right-0 top-0 p-1", {
          hidden: formStep == 0,
        })}
        animate={{
          translateX: `${200 - formStep * 100}%`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Art der Beschäftigung</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Wie möchtest du den Job besetzen?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0">Vollzeit</SelectItem>
                  <SelectItem value="1">Teilzeit</SelectItem>
                  <SelectItem value="2">
                    Freelancer / Freie Mitarbeit
                  </SelectItem>
                  <SelectItem value="3">Werkstudent</SelectItem>
                  <SelectItem value="4">Praktikum</SelectItem>
                  <SelectItem value="5">
                    Aushilfe / Geringfügige Beschäftigung
                  </SelectItem>
                  <SelectItem value="6">Saisonarbeit</SelectItem>
                  <SelectItem value="7">Trainee</SelectItem>
                  <SelectItem value="8">Zeitarbeit / Leiharbeit</SelectItem>
                  <SelectItem value="9">Job-Sharing</SelectItem>
                  <SelectItem value="10">Remote / Home-Office</SelectItem>
                  <SelectItem value="11">Selbständigkeit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </motion.div>
      <Button
        type="button"
        variant={"ghost"}
        className={cn("absolute bottom-0 right-0", {
          hidden: formStep != 2,
        })}
        onClick={() => {
          form.trigger(["type"]);
          const nameState = form.getFieldState("type");
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

export default JobType;
