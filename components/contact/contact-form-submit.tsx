"use client";

import { Send } from "lucide-react";

export function ContactFormSubmitButton({
  pending = false,
}: {
  pending?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-accent-primary font-medium text-white hover:opacity-95 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2"
    >
      <Send className="h-4 w-4 shrink-0" aria-hidden />
      {pending ? "Sending…" : "Send Message"}
    </button>
  );
}
