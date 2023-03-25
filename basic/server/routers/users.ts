import { trpc } from "../trpc";
import { z } from "zod";

const userProcedure = trpc.procedure.input(z.object({ userId: z.string() }));

export const userRouter = trpc.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId };
  }),
  update: userProcedure
    .input(z.object({ name: z.string() }))
    .output(z.object({ name: z.string(), userId: z.string() }))
    .mutation(({ input, ctx }) => {
      console.log(ctx.isAdmin);
      console.log(`Updating user: ${input.userId} to have name ${input.name}`);
      // pass will not be on the client as it's not in the output
      return { ...input, pass: "asd" };
    }),
});
