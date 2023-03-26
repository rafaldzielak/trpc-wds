import { adminProcedure, trpc } from "../trpc";
import { userRouter } from "./users";

export const appRouter = trpc.router({
  sayHi: trpc.procedure.query(() => {
    return "Hi";
  }),
  // input accepts validator
  logToServer: trpc.procedure
    .input((v) => {
      if (typeof v === "string") return v;
      throw new Error("Invalid input: Expected string");
    })
    .mutation((req) => {
      console.log(`Client says: ${req.input}`);
      return true;
    }),
  secretData: adminProcedure.query(({ ctx }) => {
    console.log(ctx.user);
    return "Secret data";
  }),
  users: userRouter,
});
