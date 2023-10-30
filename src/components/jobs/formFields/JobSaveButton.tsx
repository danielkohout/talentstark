import { Button } from "@/components/ui/button";
import { JobFieldInterface } from "@/lib/types/job";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const JobSaveButton = ({
  formStep,
  setFormStep,
  form,
  isLoading,
}: JobFieldInterface) => {
  return (
    <>
      <motion.div
        className={cn("-mt-8 absolute left-0 right-0 top-0 p-1 h-full", {
          hidden: formStep == 0,
        })}
        animate={{
          translateX: `${700 - formStep * 100}%`,
        }}
        transition={{
          ease: "easeInOut",
        }}
      >
        <div className="flex h-full items-center justify-center">
          <Button
            type="submit"
            size={"lg"}        
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              `${form.getValues("name")} anlegen`
            )}
          </Button>
        </div>
      </motion.div>
    </>
  );
};

export default JobSaveButton;
