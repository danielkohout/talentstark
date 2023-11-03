import { trpc } from "@/app/_trpc/client";

interface ApplicationParams {
  params: {
    id: string;
  };
}

const Applications = ({ params }: ApplicationParams) => {
  const { data: applications } =
    trpc.applicationRouter.getApplications.useQuery({ id: params.id });
  return <div>{JSON.stringify(applications)}</div>;
};

export default Applications;
