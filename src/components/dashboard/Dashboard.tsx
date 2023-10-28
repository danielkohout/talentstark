"use client";
import { trpc } from "@/app/_trpc/client";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { ArrowRight, Ghost } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button, buttonVariants } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { useToast } from "../ui/use-toast";
import { ToastAction } from "../ui/toast";

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
      // toast({
      //   title: "Jobs geladen",
      //   description: `Es ${
      //     jobCount === 1 ? "ist ein Job" : `sind ${jobCount} Jobs`
      //   } vorhanden.`,
      //   action: <ToastAction altText="Schließen">Schließen</ToastAction>,
      // });
    }
  }, [jobLoading, jobs]);

  function generateRandomData() {
    const pages = [
      "Page A",
      "Page B",
      "Page C",
      "Page D",
      "Page E",
      "Page F",
      "Page G",
    ];
    return pages.map((page) => ({
      name: page,
      uv: Math.floor(Math.random() * 4000) + 1000, // Zufälliger Wert zwischen 1000 und 4000
    }));
  }

  const data = generateRandomData();

  // Begrüßung basierend auf der Uhrzeit
  const now = new Date();
  const hour = now.getHours();
  let greeting = "Hallo";

  if (hour < 12) {
    greeting = "Guten Morgen";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Hallo";
  } else {
    greeting = "Guten Abend";
  }

  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
      {userLoading ? (
        <Skeleton className="h-10 w-auto" />
      ) : (
        <>
          <h1 className="text-2xl font-bold lg:text-3xl">
            {greeting} {user?.firstName}.
          </h1>
          <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
            Solltest du Fragen haben, zögere nicht uns zu kontaktieren.
          </p>
        </>
      )}
      <div className="my-8">
        {jobLoading ? (
          <Skeleton className="h-20 w-full" />
        ) : jobs && jobs.length > 0 ? (
          <div className="">
            <h2 className="text-xl font-bold">
              Aktive Jobs von deinem Unternehmen: {user?.company?.name}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-8 lg:grid-cols-3">
              {jobs.map((job) => (
                <div key={job.id} className="">
                  <div className="divide-y divide-gray-200 rounded-lg border bg-white shadow-sm dark:bg-transparent">
                    <div className="p-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Gehört zu: {job.Company?.name} / {job.Team?.name}
                      </p>
                      <h3 className="mt-1 text-2xl font-bold">{job.name}</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Job aufrufe
                      </p>
                      <ResponsiveContainer
                        className="my-10"
                        width="100%"
                        height={100}
                      >
                        <LineChart data={data}>
                          <Line
                            type="natural"
                            dataKey="uv"
                            stroke="#2563eb"
                            strokeWidth={2}
                          />
                          <Tooltip />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-between p-6">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Erstellt am:{" "}
                        {format(new Date(job.createdAt), "dd MMM yyy", {
                          locale: de,
                        })}
                      </p>
                      <Button size={"sm"} variant={"outline"}>
                        Zum Job
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border-2 border-dashed py-10 text-center">
            <Ghost className="h-10 w-10" />
            <h1 className="text-xl font-bold md:text-2xl">
              Hier sieht es noch ganz schön leer aus...
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Lege jetzt deinen ersten Job an.
            </p>
            <Link
              href={"/"}
              className={buttonVariants({
                size: "lg",
                variant: "outline",
                className: "mt-5",
              })}
            >
              Jetzt einen Job anlegen
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
