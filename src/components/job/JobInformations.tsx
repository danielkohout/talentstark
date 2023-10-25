"use client";
import { Company, Job, Team } from "@prisma/client";
import { Store, Users2 } from "lucide-react";
interface JobInformationProps {
  job: Job;
}
interface ExtendedJob extends Job {
  Team: Team;
  Company: Company;
}

const JobInformations = ({ job }: JobInformationProps) => {
  const team = (job as ExtendedJob).Team;
  const company = (job as ExtendedJob).Company;
  return (
    <div className="">
      <h1 className="text-2xl md:text-3xl font-bold">{job.name}</h1>
      <div className="text-gray-600 mt-2">
        <p className="flex items-center gap-1">
          <Store className="h-4 w-4" />
          {company.name}
        </p>
        <p className="flex items-center gap-1">
          <Users2 className="h-4 w-4" /> {team.name}
        </p>
      </div>
    </div>
  );
};

export default JobInformations;
