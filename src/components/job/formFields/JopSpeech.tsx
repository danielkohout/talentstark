import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const JobSpeech = ({ formStep, setFormStep, form }: JobFieldInterface) => {
  return (
    <>
      <motion.div
        className={cn("absolute left-0 right-0 top-0 p-1", {
          hidden: formStep == 0,
        })}
        animate={{
          translateX: `${400 - formStep * 100}%`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <FormField
          control={form.control}
          name="speech"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Bewerber Ansprache</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="du" />
                    </FormControl>
                    <FormLabel className="font-normal">Du Form</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="sie" />
                    </FormControl>
                    <FormLabel className="font-normal">Sie Form</FormLabel>
                  </FormItem>
                </RadioGroup>
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
          hidden: formStep != 4,
        })}
        onClick={() => {
          form.trigger(["speech"]);
          const nameState = form.getFieldState("speech");
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

export default JobSpeech;
