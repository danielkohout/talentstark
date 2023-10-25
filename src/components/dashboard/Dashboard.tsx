"use client";
import { trpc } from "@/app/_trpc/client";
import { ArrowRight, Ghost } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
const Dashboard = () => {
  const { toast } = useToast();
  const { data: user, isLoading: userLoading } =
    trpc.userRouter.getUser.useQuery();
  if (!userLoading && !user?.firstName) {
    redirect("/user/setup");
  }
  const { data: jobs, isLoading: jobLoading } =
    trpc.jobRouter.getCompanyJobs.useQuery();

  useEffect(() => {
    if (!jobLoading && jobs) {
      const jobCount = jobs.length;
      toast({
        title: "Jobs geladen",
        description: `Es ${
          jobCount === 1 ? "ist ein Job" : `sind ${jobCount} Jobs`
        } vorhanden.`,
        action: <ToastAction altText="Schließen">Schließen</ToastAction>,
      });
    }
  }, [jobLoading, jobs]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
      {userLoading ? (
        <Skeleton className="w-auto h-10" />
      ) : (
        <>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Hallo {user?.firstName}
          </h1>
        </>
      )}
      <hr className="mt-2" />
      <div className="mt-2">
        {jobLoading ? (
          <Skeleton className="w-full h-20" />
        ) : jobs && jobs.length > 0 ? (
          <div className="">
            {jobs.map((job) => (
              <div key={job.id} className="">
                <div className="">{job.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center flex flex-col items-center py-10">
            <Ghost className="h-10 w-10 text-gray-900" />
            <h1 className="font-bold text-gray-900 text-xl md:text-2xl">
              Hier sieht es noch ganz schön leer aus...
            </h1>
            <p className="text-gray-600">Lege jetzt deinen ersten Job an.</p>
            <Link
              href={"/"}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "mt-5",
              })}
            >
              Jetzt einen Job anlegen
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
