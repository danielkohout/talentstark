import prisma from "@/lib/db/prisma";
import { addTeamSchema, editTeamSchema } from "@/validators/team";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export const teamRouter = router({
  getTeams: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    return await prisma.team.findMany({
      where: {
        companyId: user?.companyId,
      },
    });
  }),
  getTeam: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userTeam = await prisma.userTeam.findFirst({
        where: {
          teamId: input.id,
          userId: ctx.userId,
        },
      });
      if (!userTeam) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Keine Berechtigung",
        });
      }
      const team = await prisma.team.findFirst({
        where: {
          id: input.id,
        },
        include: {
          applications: true,
          jobs: true,
        },
      });
      return team;
    }),
  addTeam: privateProcedure
    .input(addTeamSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      // console.log("input", input);
      try {
        const newTeam = await prisma.team.create({
          data: {
            name: input.name,
            city: input.city,
            contactFirstName: input.contactFirstName,
            contactLastName: input.contactLastName,
            postCode: input.postcode,
            street: input.street,
            description: input.description,
            Company: {
              connect: {
                id: user?.companyId!,
              },
            },
          },
        });
        const newUserTeam = await prisma.userTeam.create({
          data: {
            userId: user?.id!,
            teamId: newTeam.id,
          },
        });
        return newUserTeam;
      } catch (err) {
        console.log("err", err);
      }
    }),

  editTeam: privateProcedure
    .input(editTeamSchema)
    .mutation(async ({ input, ctx }) => {
      const name = input.name;
      const { user } = ctx;
      const userTeamRelation = await prisma.userTeam.findFirst({
        where: {
          userId: user?.id!,
          teamId: input.id,
        },
      });
      if (!userTeamRelation) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      await prisma.team.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          city: input.city,
          contactFirstName: input.contactFirstName,
          contactLastName: input.contactLastName,
          postCode: input.postcode,
          street: input.street,
          description: input.description,
        },
        include: {
          applications: true,
        },
      });
    }),

  getTeamJobs: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const userTeam = await prisma.userTeam.findFirst({
        where: {
          userId: ctx.user?.id,
          teamId: input.id,
        },
        include: {
          team: true,
        },
      });
      if (!userTeam) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const jobs = await prisma.job.findMany({
        where: {
          teamId: userTeam.team.id,
        },
        include: {
          Application: true,
        },
      });

      return jobs;
    }),
});
