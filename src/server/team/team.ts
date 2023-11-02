import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { privateProcedure, router } from "../trpc";
import { editCompanySchema } from "@/validators/company";
import { addTeamSchema, editTeamSchema } from "@/validators/team";
import { TRPCError } from "@trpc/server";
import { redirect } from "next/navigation";

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
      const team = await prisma.userTeam.findFirst({
        where: {
          teamId: input.id,
          userId: ctx.userId,
        },
        include: {
          team: true,
        },
      });
      if (!team) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Keine Berechtigung",
        });
      }
      return team;
    }),
  addTeam: privateProcedure
    .input(addTeamSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      console.log("input", input);
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
        return await prisma.userTeam.create({
          data: {
            userId: user?.id!,
            teamId: newTeam.id,
          },
        });
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
          name: name,
        },
      });
    }),
});
