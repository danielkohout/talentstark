"use client";
import { trpc } from "@/app/_trpc/client";
import { makeUrlFriendly } from "@/lib/urlFriendlyName";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AccessDenied from "../AccessDenied";
import { buttonVariants } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import Applications from "./Applications";

interface JobParams {
  params: {
    id: string;
  };
}

const ViewJob = ({ params }: JobParams) => {
  const { data: job, isLoading } = trpc.jobRouter.getJob.useQuery({
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

  return (
    <div>
      {/* Infoleiste */}
      <div className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
          <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            {job?.name}
            {job.Team?.name}
          </h1>
          <Link
            href={`/${job.Team?.slug ? job.Team?.slug : job.Team?.id}/${
              job.slug ? job.slug : job.id
            }`}
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
          <CardContent>{/* <p>{job.Application.length}</p> */}</CardContent>
          <CardFooter>
            <p>Bewerber ansehen</p>
          </CardFooter>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Statistiken</CardTitle>
            <CardDescription>So performt dein Job</CardDescription>
          </CardHeader>
          <CardContent>{/* <p>{job.Application.length}</p> */}</CardContent>
          <CardFooter>
            <p>Bewerber ansehen</p>
          </CardFooter>
        </Card>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <Applications params={params} />
      </div>
    </div>
  );
};

export default ViewJob;
