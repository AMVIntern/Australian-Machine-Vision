"use server";

export type FormState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  try {
    const name = [firstName, lastName].filter(Boolean).join(" ");
    if (process.env.CONTACT_WEBHOOK_URL) {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          firstName,
          lastName,
          email,
          company,
          phone: phone || undefined,
          industry,
          message,
        }),
      });
    }
    return {
      success: true,
      message:
        "Thanks for getting in touch. We'll respond within 1–2 business days.",
    };
  } catch (e) {
    return {
      success: false,
      message:
        "Something went wrong. Please try again or email us directly.",
    };
  }
}
