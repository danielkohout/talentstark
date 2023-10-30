import prisma from "@/lib/db/prisma";
import { addJobSchema } from "@/validators/job";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import openai from "@/lib/openai";

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
    .input(addJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      console.log("input", input);
      // console.log('user', user)
      try {
        const newJob = await prisma.job.create({
          data: {
            name: input.name,
            type: input.type,
            mail: input.mail,
            speech: input.speech,
            briefing: input.briefing,
            benefits: input.benefits,
            companyId: user?.companyId,
            teamId: input.team,
            userId: user?.id,
          },
        });
        console.log("newJob");
        return newJob;
      } catch (error) {
        console.log("error", error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  generateBriefingAI: privateProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      console.log("input", input);
      try {
        const result = await openai.chat.completions.create({
          messages: [{ role: "user", content: input.prompt }],
          model: "gpt-3.5-turbo",
        });
        console.log("demo", result);
        return result;
      } catch (error) {
        console.log("error: ", error);
      }
    }),
});
