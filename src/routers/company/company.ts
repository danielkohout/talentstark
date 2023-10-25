import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
});
