"use client";

import { useFormState } from "react-dom";
import { submitContactForm, type FormState } from "@/app/contact/actions";
import { ContactFormSubmitButton } from "./contact-form-submit";
import { cn } from "@/lib/utils";

const initialState: FormState = {};

const INDUSTRY_OPTIONS = [
  { value: "", label: "Select your Industry" },
  { value: "food-processing", label: "Food Processing" },
  { value: "fmcg", label: "FMCG" },
  { value: "dairy", label: "Dairy" },
  { value: "bakery", label: "Bakery" },
  { value: "healthcare", label: "Healthcare" },
  { value: "building-products", label: "Building Products" },
  { value: "transport-logistics", label: "Transport and Logistics" },
  { value: "industrial-manufacturing", label: "Industrial Manufacturing" },
  { value: "general-manufacturing", label: "General Manufacturing" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-5"
      aria-describedby={
        state?.message ? "form-status" : undefined
      }
    >
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
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className={cn(
            "mt-1 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-foreground",
            "placeholder:text-foreground-muted",
            "focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-0"
          )}
        />
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

      <ContactFormSubmitButton />
    </form>
  );
}
