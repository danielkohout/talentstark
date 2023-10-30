"use client";
import { cn } from "@/lib/utils";
import { addJobSchema } from "@/validators/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Form } from "../ui/form";
import JobName from "./formFields/JobName";
import JobTeam from "./formFields/JobTeam";
import JobType from "./formFields/JobType";
import JobMail from "./formFields/JobMail";
import JobSpeech from "./formFields/JopSpeech";
import JobBriefing from "./formFields/JobBriefing";
import JobBenefits from "./formFields/JobBenefits";
import { trpc } from "@/app/_trpc/client";
import JobSaveButton from "./formFields/JobSaveButton";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const AddJob = () => {
  const router = useRouter()
  const { mutate: addJob, isLoading,  } = trpc.jobRouter.addJob.useMutation({
    onSuccess: (newJob) => {
      toast({
        title: "Dein neuer Job wurde angelegt",
        description: "Du kannst den Job nun verwalten.",
      });
      router.push(`/job/${newJob.id}`)
    },
    onError: () => {
      toast({
        title: "Etwas ist schief gelaufen...",
        description: "Bitte versuche es erneut oder wende dich an unser Team",
        variant: "destructive",
      });
    },
  });
  const [formStep, setFormStep] = useState(0);
  const form = useForm<z.infer<typeof addJobSchema>>({
    resolver: zodResolver(addJobSchema),
    defaultValues: {
      name: "",
      benefits: "",
      briefing: "",
      mail: "",
      speech: "",
      team: "",
      type: "",
    },
  });
  async function onSubmit(data: z.infer<typeof addJobSchema>) {
    await addJob(data);
    console.log(data);
  }
  return (
    <div className="ld:px-8 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6">
      <div className="-mt-16 min-w-full">
        <div className="mx-auto flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br from-gray-500 to-gray-800 text-3xl font-bold text-white shadow-lg">
            {formStep}
          </div>
        </div>
        <Card className="mx-auto mt-8 max-w-md">
          <CardHeader>
            <CardTitle>Erstelle einen Job</CardTitle>
            <CardDescription>In weniger als 100 Sekunden.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn("relative overflow-hidden transition", {
                  "min-h-[13rem]": [0, 1, 2, 3, 4, 7].includes(formStep),
                  "min-h-[30rem]": [5, 6].includes(formStep),
                })}
              >
                {/* Name */}
                <JobName
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* Team */}
                <JobTeam
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* Beschäftigung */}
                <JobType
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* E-Mail Service */}
                <JobMail
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* Ansprache */}
                <JobSpeech
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* Job Briefing */}
                <JobBriefing
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* Job Benefits */}
                <JobBenefits
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                />

                {/* Job Benefits */}
                <JobSaveButton
                  setFormStep={setFormStep}
                  formStep={formStep}
                  form={form}
                  isLoading={isLoading}
                />

                {/* Speichern und Zurück */}
                <div className="absolute bottom-0 flex items-center gap-2 pt-8">
                  <Button
                    variant={"ghost"}
                    type="button"
                    className={cn({
                      hidden: formStep == 0,
                    })}
                    onClick={() => setFormStep(formStep - 1)}
                  >
                    <ArrowLeft className="ml-2 h-4 w-4" />
                    Zurück
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddJob;
