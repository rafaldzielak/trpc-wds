import { trpc } from "../trpc";

export const userRouter = trpc.router({
  getUser: trpc.procedure.query(() => {
    return { id: 1, name: "Rafa" };
  }),
});
