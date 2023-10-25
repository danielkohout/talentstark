import JobInformations from "@/components/job/JobInformations";
import JobTest from "@/components/job/JobTest";
import getUser from "@/lib/auth/getUser";
import getUserCompany from "@/lib/auth/getUserCompany";
import prisma from "@/lib/db/prisma";
import { Company } from "@prisma/client";
import { Store } from "lucide-react";
import { notFound } from "next/navigation";
interface PageProps {
  params: {
    jobid: string;
  };
}
const Page = async ({ params }: PageProps) => {
  const { jobid } = params;
  const user = await getUser();
  const company = await getUserCompany();

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-24">
        <div className="flex flex-col justify-center items-center mt-16 gap-2 text-center">
          <Store className="h-12 w-12 text-gray-800" />
          <h3 className="font-semibold text-xl">
            Oh Nein! Dein Account ist noch mit keiner Firma verbunden
          </h3>
          <p className="text-gray-600">
            Verbinde deinen Account mit einer bestehenden Firma <br /> oder
            melde eine neue an.
          </p>
        </div>
      </div>
    );
  }

  const job = await prisma.job.findFirst({
    where: {
      id: jobid,
      companyId: company.id,
    },
    include: {
      Company: true,
      Team: true,
      User: true,
    },
  });

  if (!job) notFound();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
      <JobInformations job={job} />
      <JobTest />
    </div>
  );
};

export default Page;
