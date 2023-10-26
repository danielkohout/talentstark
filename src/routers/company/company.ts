import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { privateProcedure, router } from "../trpc";

export const companyRouter = router({
  addCompany: privateProcedure
    .input(
      z.object({
        name: z.string(),
        street: z.string(),
        city: z.string(),
        postcode: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      return await prisma.company.create({
        data: {
          name: input.name,
          street: input.street,
          city: input.city,
          postCode: input.postcode,
          users: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
  getCompany: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    return await prisma.company.findFirst({
      where: {
        id: user?.companyId!,
      },
    });
  }),
  editCompany: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        street: z.string(),
        city: z.string(),
        postcode: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx;
      return await prisma.company.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          street: input.street,
          city: input.city,
          postCode: input.postcode,
        },
      });
    }),
});
