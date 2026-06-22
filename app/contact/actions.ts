"use server";

import { sql } from "@vercel/postgres";
import { getIndustryLabel } from "@/lib/contact-industries";
import { validateContactFields } from "@/lib/contact-validation";

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  channels?: {
    db: boolean;
    sheet: boolean;
  };
};

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

async function appendToSheet(data: {
  name: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  message: string;
}): Promise<boolean> {
  const url = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!url) return false;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone || "",
        industry: data.industry,
        message: data.message,
      }),
    });
    if (!response.ok) {
      console.error("contact: Google Sheet append returned", response.status);
      return false;
    }
    return true;
  } catch (e) {
    console.error("contact: Google Sheet append failed", e);
    return false;
  }
}

function logStorageFailure(payload: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  message: string;
}) {
  console.error("contact: all storage channels failed — full submission payload", {
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    company: payload.company,
    phone: payload.phone,
    industry: payload.industry,
    message: payload.message,
  });
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
  const industryValue = (formData.get("industry") as string)?.trim() ?? "";
  const message = (formData.get("message") as string)?.trim() ?? "";
  const industry = getIndustryLabel(industryValue);

  const errors = validateContactFields({
    firstName,
    lastName,
    email,
    company,
    industryValue,
    message,
  });

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const name = [firstName, lastName].filter(Boolean).join(" ");
  const payload = {
    firstName,
    lastName,
    email,
    company,
    phone,
    industry,
    message,
  };

  const [dbOk, sheetOk] = await Promise.all([
    storeSubmission(payload),
    appendToSheet({ name, email, company, phone, industry, message }),
  ]);

  if (!dbOk && !sheetOk) {
    logStorageFailure(payload);
  }

  return {
    success: dbOk || sheetOk,
    channels: { db: dbOk, sheet: sheetOk },
    message: dbOk || sheetOk
      ? "Thanks for getting in touch. We'll respond within 1 to 2 business days."
      : undefined,
  };
}
