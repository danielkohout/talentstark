import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import VerifyLogin from "@/components/user/VerifyLogin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = getServerSession(authOptions);

  if (!session) {
    return <VerifyLogin />;
  }
  redirect("/");
};

export default page;
