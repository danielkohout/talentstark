import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import prisma from "@/lib/db/prisma";

export const jobRouter = router({
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
      include: {
        Company: true,
        Team: true,
      },
    });

    return jobs; // Die gefundenen Jobs zurückgeben
  }),

  addJob: privateProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      console.log("text", input.text);
    }),
});
