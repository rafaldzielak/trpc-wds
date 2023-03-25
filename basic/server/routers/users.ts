import { trpc } from "../trpc";
import { z } from "zod";

const userProcedure = trpc.procedure.input(z.object({ userId: z.string() }));

export const userRouter = trpc.router({
  get: userProcedure.query(({ input }) => {
    return { id: input.userId };
  }),
  update: userProcedure.input(z.object({ name: z.string() })).mutation(({ input }) => {
    console.log(`Updating user: ${input.userId} to have name ${input.name}`);
    return input;
  }),
});
