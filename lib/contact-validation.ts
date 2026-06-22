const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFieldErrors = Record<string, string[]>;

export function validateContactFields(data: {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  industryValue: string;
  message: string;
}): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!data.firstName || data.firstName.length < 2) {
    errors.firstName = ["Please enter your first name (at least 2 characters)."];
  }
  if (!data.lastName || data.lastName.length < 2) {
    errors.lastName = ["Please enter your last name (at least 2 characters)."];
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
  if (!data.message || data.message.length < 10) {
    errors.message = ["Please enter a message (at least 10 characters)."];
  }

  return errors;
}
