import { createContext } from "@flamingo/api/context";
import { appRouter } from "@flamingo/api/routers/index";
import { auth } from "@flamingo/auth";
import { env } from "@flamingo/env/server";
import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { logger } from "./lib/logger.js";
import { initSentry } from "./lib/sentry.js";
import { startWorkers } from "./lib/workers.js";

initSentry();

const app = new Hono();

app.use(honoLogger());
app.use(
  "/*",
  cors({
    origin: env.CORS_ORIGIN ?? "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Cookie",
    ],
    credentials: true,
  }),
);

app.onError((err, c) => {
  logger.error({ err, path: c.req.path }, "Unhandled error");
  return c.json({ error: "Internal Server Error" }, 500);
});

app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: (_opts, context) => {
      return createContext({ context });
    },
  }),
);

app.get("/", (c) => {
  return c.json({ status: "ok", env: env.NODE_ENV });
});

app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

startWorkers();

logger.info("Server started");

export default app;
