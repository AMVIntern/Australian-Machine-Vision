const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Generous caps: real enquiries fit easily, oversized payloads do not.
export const FIELD_MAX_LENGTH = {
  firstName: 100,
  lastName: 100,
  email: 254,
  company: 200,
  // The phone input allows 40; the stored value also carries the dial code.
  phone: 50,
  city: 100,
  message: 5000,
} as const;

export type ContactFieldErrors = Record<string, string[]>;

export function validateContactFields(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industryValue: string;
  message: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  // False when the selected country has no states to choose from.
  stateRequired?: boolean;
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!data.firstName) {
    errors.firstName = ["Please enter your first name."];
  }
  if (!data.lastName) {
    errors.lastName = ["Please enter your last name."];
  }
  if (!data.email) {
    errors.email = ["Email is required."];
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = ["Please enter a valid email address."];
  }
  if (!data.company || data.company.length < 2) {
    errors.company = ["Please enter your company name."];
  }
  if (!data.industryValue) {
    errors.industry = ["Please select your industry."];
  }
  if (!data.country) {
    errors.country = ["Please select your country."];
  }
  if (data.stateRequired !== false && !data.state) {
    errors.state = ["Please select your state / province."];
  }
  if (!data.city || data.city.trim().length < 2) {
    errors.city = ["Please enter your city."];
  }
  if (!data.message || data.message.length < 10) {
    errors.message = ["Please enter a message (at least 10 characters)."];
  }

  for (const [field, max] of Object.entries(FIELD_MAX_LENGTH)) {
    const value = data[field as keyof typeof FIELD_MAX_LENGTH];
    if (!errors[field] && value && value.length > max) {
      errors[field] = [`Please keep this under ${max} characters.`];
    }
  }

  return errors;
}
