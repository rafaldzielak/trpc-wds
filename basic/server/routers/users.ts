import { trpc } from "../trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "ws";

const userProcedure = trpc.procedure.input(z.object({ userId: z.string() }));

const eventEmitter = new EventEmitter();

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
      eventEmitter.emit("update", input.name);
      // pass will not be on the client as it's not in the output
      return { ...input, pass: "asd" };
    }),
  // subscription is basically a web socket
  onUpdate: trpc.procedure.subscription(() => {
    return observable<string>((emit) => {
      eventEmitter.on("update", emit.next);

      // This will happen on close connection
      return () => {
        eventEmitter.off("update", emit.next);
      };
    });
  }),
});
