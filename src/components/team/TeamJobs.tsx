import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import de from "date-fns/locale/de";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

type TeamJobsProps = {
  params: {
    id: string;
  };
};

const TeamJobs = ({ params }: TeamJobsProps) => {
  const { data: jobs } = trpc.teamRouter.getTeamJobs.useQuery({
    id: params.id,
  });
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {jobs ? (
        <div>
          {jobs.map((job) => (
            <Card>
              <CardHeader>
                <CardTitle>{job.name}</CardTitle>
                <CardDescription>
                  {format(new Date(job.createdAt), "dd MMM yyy", {
                    locale: de,
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Bewerbungen: {job.Application.length}</p>
              </CardContent>
              <CardFooter>
                <Link
                  className={buttonVariants({
                    variant: "default",
                  })}
                  href={`/job/${job.id}`}
                >
                  Job ansehen
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Skeleton className="h-full w-full" />
      )}
    </div>
  );
};

export default TeamJobs;
