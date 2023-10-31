import ViewJob from "@/components/job/ViewJob";
import React from "react";
interface JobParams {
  params: {
    id: string;
  };
}
const page = ({ params }: JobParams) => {
  return <ViewJob params={params} />;
};

export default page;
