import { serverClient } from "@/app/_trpc/serverClient";
import React from "react";

const page = async () => {
  return <div>{JSON.stringify("data")}</div>;
};

export default page;
