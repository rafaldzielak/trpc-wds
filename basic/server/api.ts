import express from "express";
import cors from "cors";
import { appRouter } from "./routers";
import { createContext } from "./context";

import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import ws from "ws";

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(
  "/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

const server = app.listen(3000, () => console.log("APP LISTENING ON PORT 3000"));

applyWSSHandler({
  wss: new ws.Server({ server }),
  router: appRouter,
  createContext: () => {
    return { isAdmin: true };
  },
});

export type AppRouter = typeof appRouter;
