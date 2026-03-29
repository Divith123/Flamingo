import { sendEmail } from "@flamingo/email";
import { type Job, Worker } from "bullmq";
import { logger } from "./logger.js";
import {
  connection,
  type EmailJobData,
  type NotificationJobData,
} from "./queue.js";

export const emailWorker = new Worker<EmailJobData>(
  "email",
  async (job: Job<EmailJobData>) => {
    const { to, subject, body } = job.data;

    logger.info({ jobId: job.id, to }, "Processing email job");

    await sendEmail({ to, subject, html: body });

    logger.info({ jobId: job.id, to }, "Email job completed");

    return { sent: true, to, timestamp: new Date().toISOString() };
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 100,
      duration: 60000,
    },
  },
);

export const notificationWorker = new Worker<NotificationJobData>(
  "notification",
  async (job: Job<NotificationJobData>) => {
    const { userId, type } = job.data;

    logger.info({ jobId: job.id, userId, type }, "Processing notification job");

    logger.info({ jobId: job.id }, "Notification job completed");

    return { sent: true, type, userId, timestamp: new Date().toISOString() };
  },
  {
    connection,
    concurrency: 10,
  },
);

emailWorker.on("completed", (job) => {
  logger.info({ jobId: job?.id }, "Email job completed");
});

emailWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err: err.message }, "Email job failed");
});

emailWorker.on("error", (err) => {
  logger.error(
    { err: err.message },
    "Email worker connection error (is Redis running?)",
  );
});

notificationWorker.on("completed", (job) => {
  logger.info({ jobId: job?.id }, "Notification job completed");
});

notificationWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err: err.message }, "Notification job failed");
});

notificationWorker.on("error", (err) => {
  logger.error(
    { err: err.message },
    "Notification worker connection error (is Redis running?)",
  );
});

export async function closeWorkers() {
  await emailWorker.close();
  await notificationWorker.close();
}

export function startWorkers() {
  logger.info("BullMQ workers started");
  logger.info("- Email worker: processing 'email' queue");
  logger.info("- Notification worker: processing 'notification' queue");
}
