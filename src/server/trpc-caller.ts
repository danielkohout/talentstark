import "server-only";
import { appRouter } from "./index";
export const serverTrpc = appRouter.createCaller({
  eventServer: { trigger: async () => {} },
  session: { user: null },
});
