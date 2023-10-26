import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "../db/prisma";
import { redirect } from "next/navigation";

const getUser = async () => {
  const session = await getServerSession(authOptions);
  const userMail = session?.user?.email;
  if (!userMail) {
    redirect("/api/auth/signin");
  }
  if (userMail) {
    const user = await prisma.user.findFirst({
      where: {
        email: userMail,
      },
    });
    return user;
  }
};

export default getUser;
