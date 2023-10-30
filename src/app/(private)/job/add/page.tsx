import { serverClient } from "@/app/_trpc/serverClient";
import AddJob from "@/components/jobs/AddJob";
import React from "react";

const page = async () => {
  return <AddJob />;
};

export default page;
