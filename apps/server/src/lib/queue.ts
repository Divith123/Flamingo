import { env } from "@flamingo/env/server";
import { type ConnectionOptions, Queue } from "bullmq";

export const connection: ConnectionOptions = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  password: env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
  retryStrategy: (times: number) => {
    // Retry up to 3 times, then stop to prevent crash/spam when Redis isn't running
    if (times > 3) {
      return null;
    }
    return Math.min(times * 100, 3000); // Backoff: 100ms, 200ms, 300ms... max 3s
  },
};

export const emailQueue = new Queue("email", { connection });
export const notificationQueue = new Queue("notification", { connection });

emailQueue.on("error", (err) => {
  console.error("Email queue connection error:", err.message);
});

notificationQueue.on("error", (err) => {
  console.error("Notification queue connection error:", err.message);
});

export interface EmailJobData {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}

export interface NotificationJobData {
  userId: string;
  type: "push" | "in-app" | "sms";
  title: string;
  message: string;
  data?: Record<string, unknown>;
}

export async function queueEmail(
  data: EmailJobData,
  options?: { delay?: number; priority?: number },
) {
  return emailQueue.add("send-email", data, {
    delay: options?.delay,
    priority: options?.priority,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
}

export async function queueNotification(
  data: NotificationJobData,
  options?: { delay?: number },
) {
  return notificationQueue.add("send-notification", data, {
    delay: options?.delay,
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
}

export async function scheduleRecurringJob<T>(
  queue: Queue,
  name: string,
  data: T,
  pattern: string,
) {
  return queue.upsertJobScheduler(
    name,
    { pattern },
    { name, data: data as object },
  );
}

export async function getQueueStats(queue: Queue) {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    queue.getWaitingCount(),
    queue.getActiveCount(),
    queue.getCompletedCount(),
    queue.getFailedCount(),
    queue.getDelayedCount(),
  ]);

  return { waiting, active, completed, failed, delayed };
}

export async function closeQueues() {
  await emailQueue.close();
  await notificationQueue.close();
}
