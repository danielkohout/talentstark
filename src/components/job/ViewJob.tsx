"use client";
import { trpc } from "@/app/_trpc/client";
import { makeUrlFriendly } from "@/lib/urlFriendlyName";
import { ArrowRight, Eye } from "lucide-react";
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
import { useEffect, useState } from "react";
import QRCode from "qrcode";
interface JobParams {
  params: {
    id: string;
  };
}

const ViewJob = ({ params }: JobParams) => {
  const { data: job, isLoading } = trpc.jobRouter.getJob.useQuery({
    id: params.id,
  });
  const [qrcodeSrc, setQrcodeSrc] = useState<string>("");
  useEffect(() => {
    const generateQrCode = async () => {
      QRCode.toDataURL(
        `https://app.talentstark.de/${
          job?.Team?.slug ? job.Team?.slug : job?.Team?.id
        }/${job?.slug ? job.slug : job?.id}`
      ).then(setQrcodeSrc);
    };
    generateQrCode();
  }, [job]);

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
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              href={`/${job.Team?.slug ? job.Team?.slug : job.Team?.id}/${
                job.slug ? job.slug : job.id
              }`}
              className={buttonVariants({
                variant: "ghost",
              })}
            >
              <Eye className="mr-2 h-4 w-4" />
              Job Seite
            </Link>
            <a
              className={buttonVariants({
                variant: "ghost",
              })}
              href={qrcodeSrc}
              download={"File"}
            >
              <img className="mr-2 h-5 w-5" src={qrcodeSrc} alt="QR Code" />
              Download
            </a>
          </div>
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
