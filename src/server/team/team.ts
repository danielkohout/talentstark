import prisma from "@/lib/db/prisma";
import { addTeamSchema, editTeamSchema } from "@/validators/team";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export const teamRouter = router({
  getTeams: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Kein Benutzer vorhanden",
      });
    }
    try {
      return await prisma.team.findMany({
        where: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
        include: {
          jobs: true,
        },
      });
    } catch (e) {
      console.log("e", e);
      return;
    }
  }),

  getTeam: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const teamMember = await prisma.team.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              id: ctx.userId,
            },
          },
        },
      });
      if (!teamMember) {
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
      try {
        return await prisma.team.create({
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
            users: {
              connect: {
                id: user?.id,
              },
            },
          },
        });
      } catch (err) {
        console.log("err", err);
      }
    }),

  editTeam: privateProcedure
    .input(editTeamSchema)
    .mutation(async ({ input, ctx }) => {
      const { user } = ctx;
      // Zuerst überprüfen, ob der Benutzer im Team ist
      const team = await prisma.team.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              id: user?.id!,
            },
          },
        },
      });
      // Wenn der Benutzer nicht im Team ist, Fehler werfen
      if (!team) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      // Wenn der Benutzer im Team ist, das Team aktualisieren
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
      // Stellen Sie sicher, dass ein Benutzer im Kontext vorhanden ist.
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Überprüfen Sie, ob der Benutzer Teil des Teams ist.
      const team = await prisma.team.findFirst({
        where: {
          id: input.id,
          users: {
            some: {
              id: ctx.user.id,
            },
          },
        },
      });

      // Wenn das Team nicht gefunden wurde, hat der Benutzer keinen Zugriff.
      if (!team) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Wenn das Team vorhanden ist, holen Sie die Jobs für dieses Team.
      const jobs = await prisma.job.findMany({
        where: {
          teamId: team.id,
        },
        include: {
          Application: true, // Stellen Sie sicher, dass dies der richtige Name der Relation ist
        },
      });

      return jobs;
    }),

  deleteTeam: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await prisma.team.delete({
        where: {
          id: input.id,
          users: {
            some: {
              id: ctx.user?.id,
            },
          },
        },
      });
    }),
});
