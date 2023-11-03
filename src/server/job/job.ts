import prisma from "@/lib/db/prisma";
import { addJobSchema } from "@/validators/job";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { privateProcedure, router } from "../trpc";

export const jobRouter = router({
  addJob: privateProcedure
    .input(addJobSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      // console.log("input", input);
      // console.log('user', user)
      try {
        if (!ctx.user?.id) {
          throw new Error("User ID nicht vorhanden");
        }
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
        return newJob;
      } catch (error) {
        // console.log("error", error);
        throw new TRPCError({ code: "BAD_REQUEST" });
      }
    }),

  getJobDetails: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.user;
      const userCompany = await prisma.user.findFirst({
        where: {
          id: user?.id,
        },
        include: {
          company: true,
        },
      });
      // console.log("userCompany", userCompany?.company);
      const job = await prisma.job.findFirst({
        where: {
          id: input.id,
          companyId: userCompany?.companyId,
        },
        include: {
          Team: true,
          Application: true,
          Company: true,
        },
      });
      if (!job) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Keine Berechtigung",
        });
      }
      return job;
    }),

  getJobs: privateProcedure.query(async ({ ctx }) => {
    if (!ctx.user?.id) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return await prisma.job.findMany({
      where: {
        Team: {
          users: {
            some: {
              id: ctx.user.id,
            },
          },
        },
      },
      include: {
        Application: true,
        Team: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  }),

  getJob: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      try {
        const job = await prisma.job.findUnique({
          where: {
            id: input.id,
            Team: {
              users: {
                some: {
                  id: ctx.user.id,
                },
              },
            },
          },
          include: {
            Team: true,
            Company: true,
          },
        });

        if (!job) {
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        return job;
      } catch (err) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: err });
      }
    }),
});
