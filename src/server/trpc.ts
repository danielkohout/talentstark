import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/db/prisma";
import { TRPCError, initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";

const t = initTRPC.create();

const middleware = t.middleware;
const isAuth = middleware(async (opts) => {
  const session = await getServerSession(authOptions);
  const userMail = session?.user?.email;

  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  if (userMail) {
    const user = await prisma.user.findFirst({
      where: {
        email: userMail,
      },
    });
    return opts.next({
      ctx: {
        userId: user!.id,
        user,
      },
    });
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
