import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import React from "react";

export default async function AuthCheckServer() {
  const session = await getServerSession();

  if (!session) {
    redirect("/api/auth/login");
  }

  return <div>AuthCheckServer</div>;
}
