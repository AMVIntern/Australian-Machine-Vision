"use server";

import { sql } from "@vercel/postgres";
import nodemailer from "nodemailer";

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "vikrant@amvco.com.au";

async function storeSubmission(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  message: string;
}): Promise<boolean> {
  if (!process.env.POSTGRES_URL) return false;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT NOT NULL,
        phone TEXT,
        industry TEXT NOT NULL,
        message TEXT NOT NULL
      )
    `;
    await sql`
      INSERT INTO contact_submissions
        (first_name, last_name, email, company, phone, industry, message)
      VALUES
        (${data.firstName}, ${data.lastName}, ${data.email}, ${data.company},
         ${data.phone || null}, ${data.industry}, ${data.message})
    `;
    return true;
  } catch (e) {
    console.error("contact: database insert failed", e);
    return false;
  }
}

async function notifyByEmail(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  message: string;
}): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return false;

  const port = Number(process.env.SMTP_PORT ?? 587);
  // Port 465 uses implicit TLS; 587 uses STARTTLS. Allow override via SMTP_SECURE.
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;
  const from = process.env.CONTACT_FROM_EMAIL ?? user;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `New website enquiry from ${data.name}${
        data.company ? ` (${data.company})` : ""
      }`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Industry: ${data.industry}`,
        "",
        "Message:",
        data.message,
      ].join("\n"),
    });
    return true;
  } catch (e) {
    console.error("contact: SMTP send failed", e);
    return false;
  }
}

export async function submitContactForm(
  _prevState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const firstName = (formData.get("firstName") as string)?.trim() ?? "";
  const lastName = (formData.get("lastName") as string)?.trim() ?? "";
  const email = (formData.get("email") as string)?.trim() ?? "";
  const company = (formData.get("company") as string)?.trim() ?? "";
  const phone = (formData.get("phone") as string)?.trim() ?? "";
  const industry = (formData.get("industry") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";

  const errors: Record<string, string[]> = {};

  if (!firstName || firstName.length < 2) {
    errors.firstName = ["Please enter your first name (at least 2 characters)."];
  }
  if (!lastName || lastName.length < 2) {
    errors.lastName = ["Please enter your last name (at least 2 characters)."];
  }
  if (!email) {
    errors.email = ["Email is required."];
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = ["Please enter a valid email address."];
  }
  if (!company || company.length < 2) {
    errors.company = ["Please enter your company name."];
  }
  if (!industry) {
    errors.industry = ["Please select your industry."];
  }
  if (!message || message.length < 10) {
    errors.message = ["Please enter a message (at least 10 characters)."];
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const name = [firstName, lastName].filter(Boolean).join(" ");

  // Store the submission and send the notification in parallel. Each is
  // guarded and logs its own failure so one channel failing does not lose
  // the lead through the other.
  const [stored, notified] = await Promise.all([
    storeSubmission({
      firstName,
      lastName,
      email,
      company,
      phone,
      industry,
      message,
    }),
    notifyByEmail({ name, email, company, phone, industry, message }),
  ]);

  if (!stored && !notified) {
    console.warn("contact: submission not stored or emailed", {
      name,
      email,
      company,
      industry,
    });
  }

  return {
    success: true,
    message:
      "Thanks for getting in touch. We'll respond within 1 to 2 business days.",
  };
}
