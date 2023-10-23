"use client";
import { trpc } from "@/app/_trpc/client";
import { FileStack, Ghost, Loader2, Plus, TrashIcon } from "lucide-react";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { deAT } from "date-fns/locale";
import { useState } from "react";
const Dashboard = () => {
  const [currentlyDeletingJob, setCurrentlyDeletingJob] = useState<
    string | null
  >(null);
  const utils = trpc.useUtils();
  const { data: companyJobs, isLoading } = trpc.getCompanyJobs.useQuery();
  const { mutate: deleteJob } = trpc.deleteJob.useMutation({
    onSuccess: () => {
      utils.getCompanyJobs.invalidate();
    },
    onMutate({ id }) {
      setCurrentlyDeletingJob(id);
    },
    onSettled() {
      setCurrentlyDeletingJob(null);
    },
  });
  return (
    <main className="mx-auto max-w-7xl md:p-10 px-6 lg:px-8">
      <div className="border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3">
          Deine Jobs
        </h1>
        <Button>Neuer Job</Button>
      </div>
      {companyJobs && companyJobs.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-gray-200 md:grid-cols-2 lg:grid-cols-3">
          {companyJobs
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((job) => (
              <li
                key={job.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
              >
                <div className="p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"></div>
                    <h3 className="text-lg text-gray-900 font-medium">
                      {job.name}
                    </h3>
                  </div>
                  <Link href={`/job/${job.id}`}>Zum Job</Link>
                </div>
                <div className="px-2 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                  <div className="flex gap-2 p-3 items-center text-sm text-gray-600">
                    <Plus className="h-4 w-4" />
                    {format(new Date(job.createdAt), " MMM yyyy", {
                      locale: deAT,
                    })}
                  </div>

                  <div className="flex gap-2 p-3 items-center text-sm text-gray-600">
                    <FileStack className="h-4 w-4" />
                    <p>10</p>
                  </div>

                  <Button
                    onClick={() => deleteJob({ id: job.id })}
                    size={"sm"}
                    className="w-full"
                    variant={"destructive"}
                  >
                    {currentlyDeletingJob === job.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <TrashIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <div className="">
          <Skeleton className="my-2" height={100} count={3} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-16 gap-2">
          <Ghost className="h-12 w-12 text-gray-800" />
          <h3 className="font-semibold text-xl">Es ist ganz schön leer hier</h3>
          <p className="text-gray-600">Erstelle jetzt deinen ersten Job.</p>
        </div>
      )}
    </main>
  );
};
export default Dashboard;
