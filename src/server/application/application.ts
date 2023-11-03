import prisma from "@/lib/db/prisma";
import { TRPCError } from "@trpc/server";
import z from "zod";
import { privateProcedure, router } from "../trpc";

export const applicationRouter = router({
  getApplications: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      // Stellen Sie sicher, dass der Benutzer angemeldet ist
      if (!ctx.user?.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      // Überprüfen Sie, ob der Benutzer im Team des spezifizierten Jobs ist
      const job = await prisma.job.findUnique({
        where: { id: input.id },
        include: {
          Team: {
            where: {
              users: {
                some: {
                  id: ctx.user.id,
                },
              },
            },
          },
        },
      });

      if (!job || !job.Team) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Kein Zugriff auf Bewerbungen für diesen Job",
        });
      }

      // Bewerbungen für den Job abrufen
      const applications = await prisma.application.findMany({
        where: { jobId: input.id },
      });

      return applications;
    }),
});
