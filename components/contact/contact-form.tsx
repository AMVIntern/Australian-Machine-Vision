"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Country, State } from "country-state-city";
import { submitContactForm, type FormState } from "@/app/contact/actions";
import { ContactFormSubmitButton } from "./contact-form-submit";
import { SearchableSelect } from "./searchable-select";
import { cn } from "@/lib/utils";
import {
  CONTACT_INDUSTRY_OPTIONS,
  getIndustryLabel,
} from "@/lib/contact-industries";
import { validateContactFields } from "@/lib/contact-validation";

// Australia first, then the rest alphabetically — most leads are local.
const ALL_COUNTRIES = Country.getAllCountries();
const COUNTRY_OPTIONS = [
  ...ALL_COUNTRIES.filter((c) => c.isoCode === "AU"),
  ...ALL_COUNTRIES.filter((c) => c.isoCode !== "AU").sort((a, b) =>
    a.name.localeCompare(b.name)
  ),
];

// Phone extension options — Australia first, deduped by dial code, then alphabetical by country name.
const PHONE_CODE_OPTIONS = (() => {
  const seen = new Set<string>();
  const withCode = ALL_COUNTRIES.filter((c) => c.phonecode && !seen.has(`${c.isoCode}`));
  const au = withCode.find((c) => c.isoCode === "AU");
  const rest = withCode
    .filter((c) => c.isoCode !== "AU")
    .sort((a, b) => a.name.localeCompare(b.name));
  return au ? [au, ...rest] : rest;
})();

// Combobox-ready option lists (full country name, searchable)
const COUNTRY_COMBOBOX_OPTIONS = COUNTRY_OPTIONS.map((c) => ({
  value: c.isoCode,
  label: c.name,
}));

const PHONE_COMBOBOX_OPTIONS = PHONE_CODE_OPTIONS.map((c) => ({
  value: c.isoCode,
  label: `${c.name} +${c.phonecode.replace(/\+/g, "")}`,
}));

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

const INDUSTRY_OPTIONS = [
  { value: "", label: "Select your Industry" },
  ...CONTACT_INDUSTRY_OPTIONS,
];

const SUCCESS_MESSAGE =
  "Thanks for getting in touch. We'll respond within 1 to 2 business days.";

const FAILURE_MESSAGE =
  "Could not send your message. Please try again or contact us directly.";

async function submitWeb3Forms(formData: FormData): Promise<boolean> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const result = await response.json();
    return result.success === true;
  } catch (e) {
    console.error("contact: Web3Forms submit failed", e);
    return false;
  }
}

function buildStorageFormData(
  form: HTMLFormElement,
  industryLabel: string,
  countryLabel: string,
  stateLabel: string,
  phone: string
) {
  const formData = new FormData(form);
  formData.set("industry", industryLabel);
  formData.set("country", countryLabel);
  formData.set("state", stateLabel);
  formData.set("phone", phone);
  return formData;
}

function buildEmailFormData(
  form: HTMLFormElement,
  industryLabel: string,
  countryLabel: string,
  stateLabel: string,
  phone: string,
  name: string,
  email: string,
  company: string
) {
  const formData = new FormData(form);
  formData.set("industry", industryLabel);
  formData.set("country", countryLabel);
  formData.set("state", stateLabel);
  formData.set("phone", phone);
  formData.append("access_key", ACCESS_KEY!);
  formData.append("name", name);
  formData.append(
    "subject",
    `New website enquiry from ${name}${company ? ` (${company})` : ""}`
  );
  formData.append("from_name", "AMV Website");
  formData.append("replyto", email);
  return formData;
}

export function ContactForm() {
  const [state, setState] = useState<FormState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("AU");
  const [phoneCountry, setPhoneCountry] = useState("AU");
  const [stateCode, setStateCode] = useState("");

  const stateOptions = useMemo(
    () => State.getStatesOfCountry(countryCode),
    [countryCode]
  );

  const stateComboboxOptions = useMemo(
    () => stateOptions.map((s) => ({ value: s.isoCode, label: s.name })),
    [stateOptions]
  );

  // Reset the selected state whenever the country changes, since the previous
  // selection may not exist in the new country's state list.
  useEffect(() => {
    setStateCode("");
  }, [countryCode]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setState({});

    const form = event.currentTarget;
    const rawFormData = new FormData(form);

    const firstName = (rawFormData.get("firstName") as string)?.trim() ?? "";
    const lastName = (rawFormData.get("lastName") as string)?.trim() ?? "";
    const email = (rawFormData.get("email") as string)?.trim() ?? "";
    const company = (rawFormData.get("company") as string)?.trim() ?? "";
    const phoneNumber = (rawFormData.get("phone") as string)?.trim() ?? "";
    const phoneDialCode = (
      PHONE_CODE_OPTIONS.find((c) => c.isoCode === phoneCountry)?.phonecode ?? ""
    ).replace(/\+/g, "");
    const phone = phoneNumber
      ? `+${phoneDialCode} ${phoneNumber}`
      : "";
    const countryValue = (rawFormData.get("country") as string)?.trim() ?? "";
    const stateValue = (rawFormData.get("state") as string)?.trim() ?? "";
    const city = (rawFormData.get("city") as string)?.trim() ?? "";
    const industryValue = (rawFormData.get("industry") as string)?.trim() ?? "";
    const message = (rawFormData.get("message") as string)?.trim() ?? "";
    const industryLabel = getIndustryLabel(industryValue);
    const countryLabel =
      COUNTRY_OPTIONS.find((c) => c.isoCode === countryValue)?.name ?? countryValue;
    const stateLabel =
      stateOptions.find((s) => s.isoCode === stateValue)?.name ?? stateValue;
    const name = [firstName, lastName].filter(Boolean).join(" ");

    const errors = validateContactFields({
      firstName,
      lastName,
      email,
      company,
      industryValue,
      message,
      country: countryValue,
      state: stateValue,
      city,
    });

    if (Object.keys(errors).length > 0) {
      setState({ success: false, errors });
      setIsSubmitting(false);
      return;
    }

    const storageFormData = buildStorageFormData(
      form,
      industryLabel,
      countryLabel,
      stateLabel,
      phone
    );

    const [emailSettled, storageSettled] = await Promise.allSettled([
      ACCESS_KEY
        ? submitWeb3Forms(
            buildEmailFormData(
              form,
              industryLabel,
              countryLabel,
              stateLabel,
              phone,
              name,
              email,
              company
            )
          )
        : Promise.resolve(false),
      submitContactForm(null, storageFormData).then((result) => {
        if (result.errors) return false;
        return (result.channels?.db ?? false) || (result.channels?.sheet ?? false);
      }),
    ]);

    const emailOk =
      emailSettled.status === "fulfilled" && emailSettled.value === true;
    const storageOk =
      storageSettled.status === "fulfilled" && storageSettled.value === true;

    const anyOk = emailOk || storageOk;

    if (anyOk) {
      setState({ success: true, message: SUCCESS_MESSAGE });
      form.reset();
    } else {
      console.error("contact: all channels failed — full submission payload", {
        firstName,
        lastName,
        email,
        company,
        phone,
        industry: industryLabel,
        message,
        channels: {
          email: ACCESS_KEY ? emailOk : "not configured",
          storage: storageOk,
        },
      });
      setState({ success: false, message: FAILURE_MESSAGE });
    }

    setIsSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      aria-describedby={state?.message ? "form-status" : undefined}
    >
      {/* Honeypot spam field (Web3Forms) */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      {state?.message && (
        <div
          id="form-status"
          role="alert"
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            state.success
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-800"
          )}
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-firstName"
            className="block text-sm font-medium text-foreground"
          >
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            className={cn(
              "mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
              "placeholder:text-foreground-muted",
              "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
              state?.errors?.firstName && "border-red-500"
            )}
            aria-invalid={!!state?.errors?.firstName}
            aria-describedby={state?.errors?.firstName ? "firstName-error" : undefined}
          />
          {state?.errors?.firstName && (
            <p id="firstName-error" className="mt-1 text-sm text-red-600">
              {state.errors.firstName[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-lastName"
            className="block text-sm font-medium text-foreground"
          >
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="contact-lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            className={cn(
              "mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
              "placeholder:text-foreground-muted",
              "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
              state?.errors?.lastName && "border-red-500"
            )}
            aria-invalid={!!state?.errors?.lastName}
            aria-describedby={state?.errors?.lastName ? "lastName-error" : undefined}
          />
          {state?.errors?.lastName && (
            <p id="lastName-error" className="mt-1 text-sm text-red-600">
              {state.errors.lastName[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium text-foreground"
        >
          Work Email <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={cn(
            "mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
            "placeholder:text-foreground-muted",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
            state?.errors?.email && "border-red-500"
          )}
          aria-invalid={!!state?.errors?.email}
          aria-describedby={state?.errors?.email ? "email-error" : undefined}
        />
        {state?.errors?.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-company"
          className="block text-sm font-medium text-foreground"
        >
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          className={cn(
            "mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
            "placeholder:text-foreground-muted",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
            state?.errors?.company && "border-red-500"
          )}
          placeholder="Your Company"
          aria-invalid={!!state?.errors?.company}
          aria-describedby={state?.errors?.company ? "company-error" : undefined}
        />
        {state?.errors?.company && (
          <p id="company-error" className="mt-1 text-sm text-red-600">
            {state.errors.company[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium text-foreground"
        >
          Phone Number
        </label>
        <div className="mt-1 flex gap-2">
          <div className="w-56 shrink-0">
            <SearchableSelect
              id="contact-phone-code"
              name="phoneCountry"
              options={PHONE_COMBOBOX_OPTIONS}
              value={phoneCountry}
              onChange={(v) => {
                setPhoneCountry(v);
                setCountryCode(v);
              }}
              placeholder="Search country..."
            />
          </div>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={cn(
              "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
              "placeholder:text-foreground-muted",
              "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0"
            )}
            placeholder="e.g. 412 345 678"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-country"
            className="block text-sm font-medium text-foreground"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <SearchableSelect
              id="contact-country"
              name="country"
              options={COUNTRY_COMBOBOX_OPTIONS}
              value={countryCode}
              onChange={(v) => setCountryCode(v)}
              placeholder="Search country..."
              error={!!state?.errors?.country}
            />
          </div>
          {state?.errors?.country && (
            <p id="country-error" className="mt-1 text-sm text-red-600">
              {state.errors.country[0]}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="contact-state"
            className="block text-sm font-medium text-foreground"
          >
            State / Province <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <SearchableSelect
              id="contact-state"
              name="state"
              options={stateComboboxOptions}
              value={stateCode}
              onChange={(v) => setStateCode(v)}
              placeholder={
                stateComboboxOptions.length
                  ? "Search state / province..."
                  : "No states available"
              }
              disabled={stateComboboxOptions.length === 0}
              error={!!state?.errors?.state}
            />
          </div>
          {state?.errors?.state && (
            <p id="state-error" className="mt-1 text-sm text-red-600">
              {state.errors.state[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-city"
          className="block text-sm font-medium text-foreground"
        >
          City <span className="text-red-500">*</span>
        </label>
        <input
          id="contact-city"
          name="city"
          type="text"
          autoComplete="address-level2"
          required
          className={cn(
            "mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
            "placeholder:text-foreground-muted",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
            state?.errors?.city && "border-red-500"
          )}
          placeholder="e.g. Melbourne"
          aria-invalid={!!state?.errors?.city}
          aria-describedby={state?.errors?.city ? "city-error" : undefined}
        />
        {state?.errors?.city && (
          <p id="city-error" className="mt-1 text-sm text-red-600">
            {state.errors.city[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-industry"
          className="block text-sm font-medium text-foreground"
        >
          Industry <span className="text-red-500">*</span>
        </label>
        <select
          id="contact-industry"
          name="industry"
          required
          className={cn(
            "mt-1 w-full appearance-none rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
            "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 24 24%27 stroke=%27%2378716c%27%3E%3Cpath stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m19 9-7 7-7-7%27/%3E%3C/svg%3E')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10",
            state?.errors?.industry && "border-red-500"
          )}
          aria-invalid={!!state?.errors?.industry}
          aria-describedby={state?.errors?.industry ? "industry-error" : undefined}
        >
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt.value || "placeholder"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {state?.errors?.industry && (
          <p id="industry-error" className="mt-1 text-sm text-red-600">
            {state.errors.industry[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-foreground"
        >
          What can we help you with? <span className="text-red-500">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={cn(
            "mt-1 w-full resize-y rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
            "placeholder:text-foreground-muted",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0",
            state?.errors?.message && "border-red-500"
          )}
          placeholder="Tell us about your inspection or quality control challenge and what you want to achieve."
          aria-invalid={!!state?.errors?.message}
          aria-describedby={state?.errors?.message ? "message-error" : undefined}
        />
        {state?.errors?.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      <ContactFormSubmitButton pending={isSubmitting} />
    </form>
  );
}
