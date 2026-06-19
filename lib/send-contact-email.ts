/**
 * Web3Forms must be called from the browser (not a Server Action).
 * See https://docs.web3forms.com/getting-started/troubleshooting
 */

export type ContactEmailPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  industry: string;
  message: string;
};

export async function sendContactEmail(
  data: ContactEmailPayload
): Promise<boolean> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.warn("contact: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set");
    return false;
  }

  const name = [data.firstName, data.lastName].filter(Boolean).join(" ");

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: "AMV Website",
        subject: `New website enquiry from ${name}${
          data.company ? ` (${data.company})` : ""
        }`,
        name,
        email: data.email,
        replyto: data.email,
        company: data.company,
        phone: data.phone || "Not provided",
        industry: data.industry,
        message: data.message,
        botcheck: false,
      }),
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) {
      console.error("contact: Web3Forms send failed", {
        status: response.status,
        result,
      });
      return false;
    }
    return true;
  } catch (error) {
    console.error("contact: Web3Forms request failed", error);
    return false;
  }
}
