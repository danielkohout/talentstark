"use client";
import { useCompletion } from "ai/react";
import { Input } from "../ui/input";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import AccessDenied from "../AccessDenied";
import { makeUrlFriendly } from "@/lib/urlFriendlyName";
import { Skeleton } from "../ui/skeleton";
interface JobParams {
  params: {
    id: string;
  };
}

const ViewJob = ({ params }: JobParams) => {
  const { data: job, isLoading } = trpc.jobRouter.getJobDetails.useQuery({
    id: params.id,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (!job) {
    return <AccessDenied />;
  }

  const companyLink = makeUrlFriendly(job.Company?.name);

  return (
    <div>
      {/* Infoleiste */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
          <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            {job?.name}
          </h1>
          <Link
            href={`/${companyLink}`}
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Job Seite
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      {/* Info */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 md:grid-cols-3 md:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Bewerbungen</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{job.Application.length}</p>
          </CardContent>
          <CardFooter>
            <p>Bewerber ansehen</p>
          </CardFooter>
        </Card>
      </div>
      <div className="mx-auto grid max-w-7xl px-6 py-8  md:px-8">
        <Card>
          <CardHeader>
            <CardTitle>Bewerbungen</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{job.briefing}</p>
          </CardContent>
          <CardFooter>
            <p>Bewerber ansehen</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ViewJob;
