import { getServerSession } from "next-auth";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
export const appRouter = router({
  getUser: publicProcedure.query(async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/");
    }
    console.log("session", session);
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
    });
    console.log("user", user);
    return user;
  }),
  getCompanyJobs: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    // Finde den Benutzer und seine zugehörige Firma
    const userWithCompany = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    });

    const companyId = userWithCompany?.company?.id;

    // Finde alle Jobs der Firma
    const jobs = await prisma.job.findMany({
      where: { companyId: companyId },
    });

    return jobs; // Die gefundenen Jobs zurückgeben
  }),
  deleteJob: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      const job = await prisma.job.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });

      if (!job) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      await prisma.job.delete({
        where: {
          id: input.id,
        },
      });
      revalidatePath("/");

      return job;
    }),
});

export type AppRouter = typeof appRouter;
