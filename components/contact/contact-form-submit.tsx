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
      className="chamfer inline-flex h-12 w-full items-center justify-center gap-2 bg-ink font-semibold text-white transition-colors hover:bg-accent-primary disabled:cursor-wait disabled:opacity-60"
    >
      <Send className="h-4 w-4 shrink-0" aria-hidden />
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}
