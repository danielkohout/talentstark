import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const userRouter = router({
  getUser: privateProcedure.query(async ({ ctx }) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect("/");
    }
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      },
      include: {
        company: true,
        teams: {
          include: {
            team: true,
          },
        },
      },
    });
    return user;
  }),

  updateUser: privateProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
        },
      });
      return;
    }),
});
