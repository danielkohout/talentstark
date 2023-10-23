import { getServerSession } from "next-auth";
import prisma from "../db/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

interface Session {
  user: string;
  email: string;
}

export default async function getUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const currentUserEmail = session?.user?.email!;
  const user = await prisma.user.findUnique({
    where: {
      email: currentUserEmail,
    },
  });
  console.log("getUser: ", user);
  return user;
}
