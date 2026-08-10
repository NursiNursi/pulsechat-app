import { Resend } from "resend";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";
import { ENV } from "../lib/env.js";

const resend = new Resend(ENV.RESEND_API_KEY);

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const sender = {
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME,
  };

  const { data, error } = await resend.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to PulseChat!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome Email sent successfully", data);
};
