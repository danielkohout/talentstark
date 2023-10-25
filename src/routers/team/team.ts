import prisma from "@/lib/db/prisma";
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
  addTeam: privateProcedure
    .input(
      z.object({
        teamName: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const teamName = input.teamName;
      const { user } = ctx;
      const newTeam = await prisma.team.create({
        data: {
          name: teamName,
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
    }),
});
