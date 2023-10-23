import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "../db/prisma";

const getUserCompany = async () => {
  try {
    const session = await getServerSession(authOptions);
    const userMail = session?.user?.email;

    if (!userMail) {
      // Umleitung sollte auf dem Client erfolgen
      return { redirect: "/api/auth/signin" };
    }

    const user = await prisma.user.findFirst({
      where: {
        email: userMail,
      },
      include: {
        company: true, // Füge die Company-Information zum User hinzu
      },
    });

    if (!user || !user.company) {
      return 0;
    }

    return user.company;
  } catch (error) {
    console.error("Fehler beim Abrufen des Nutzers und der Firma:", error);
    return { error: "Ein Fehler ist aufgetreten" };
  }
};

export default getUserCompany;
