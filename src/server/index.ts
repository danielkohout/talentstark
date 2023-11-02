import { privateProcedure, publicProcedure, router } from "./trpc";
import prisma from "@/lib/db/prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { revalidatePath } from "next/cache";
import { jobRouter } from "./job/job";
import { userRouter } from "./user/user";
import { companyRouter } from "./company/company";
import { teamRouter } from "./team/team";
import { applicationRouter } from "./application/application";
export const appRouter = router({
  deleteJob: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;
      const job = await prisma.job.findFirst({
        where: {
          id: input.id,
          userId,
        },
      });
      if (!job) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      await prisma.job.delete({
        where: {
          id: input.id,
        },
      });
      revalidatePath("/");
      return job;
    }),
  jobRouter,
  userRouter,
  companyRouter,
  teamRouter,
  applicationRouter,
  getTodos: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
});

export type AppRouter = typeof appRouter;
