import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "../db/prisma";
import { redirect } from "next/navigation";

const getUserCompany = async () => {
  const session = await getServerSession(authOptions);
  const userMail = session?.user?.email;

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findFirst({
    where: {
      email: userMail,
    },
    include: {
      company: true, // Füge die Company-Information zum User hinzu
    },
  });

  // Überprüfe, ob der Benutzer gefunden wurde
  if (!user) {
    return null; // Oder eine andere angemessene Antwort
  }
  return user.company;
};

export default getUserCompany;
