import { trpc } from "../trpc";

const userProcedure = trpc.procedure.input((v) => {
  if (typeof v === "string") return v;
  throw new Error("Invalid input: Expected string");
});

export const userRouter = trpc.router({
  getUser: userProcedure.query(() => {
    return { id: 1, name: "Rafa" };
  }),
});
