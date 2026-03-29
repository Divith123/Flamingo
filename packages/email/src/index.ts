import { env } from "@flamingo/env/server";
import { Resend } from "resend";
import { ResetPasswordEmail } from "./templates/reset-password-email";
import { VerificationEmail } from "./templates/verification-email";
import { WelcomeEmail } from "./templates/welcome";

const resend = new Resend(env.RESEND_API_KEY || "re_dummy_key_for_dev");

export { ResetPasswordEmail, VerificationEmail, WelcomeEmail };

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  react?: React.ReactElement;
  from?: string;
  replyTo?: string;
}

export async function sendEmail(options: SendEmailOptions) {
  const { to, subject, html, text, react, from, replyTo } = options;
  const fromAddress = from || env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const { data, error } = await resend.emails.send({
    from: fromAddress,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    text,
    react,
    replyTo,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return { success: true, data };
}
