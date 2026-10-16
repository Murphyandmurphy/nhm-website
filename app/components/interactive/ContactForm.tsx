"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({
  successTitle = "Thank you — message sent",
  successBody = "Thanks for getting in touch. I'll get back to you as soon as I can.",
}: {
  successTitle?: string;
  successBody?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data?.message || "Unable to send your message right now. Please try again later.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send your message right now. Please check your connection and try again.");
    }
  };

  return (
    <div className="formcard">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            className="formsuccess"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="formsuccess__icon">
              <Icon name="Check" size={30} stroke={2} />
            </div>
            <h3 className="formsuccess__title">{successTitle}</h3>
            <p style={{ color: "var(--ink-500)", margin: "0 0 1.5rem" }}>{successBody}</p>
            <Button variant="secondary" type="button" onClick={() => setStatus("idle")}>
              Send another
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className="formgrid"
            onSubmit={submit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Input label="Name" name="name" autoComplete="name" placeholder="Your name" required />
            <Input label="Company name" name="company" autoComplete="organization" placeholder="Your company" />
            <Input label="Email" name="email" autoComplete="email" type="email" placeholder="you@company.co.uk" required />
            <Input label="Phone" name="phone" autoComplete="tel" optional placeholder="07712 120 104" />
            <div className="full">
              <Textarea
                label="How can I help?"
                name="message"
                placeholder="Tell me a little about where you are and what you're trying to achieve…"
                rows={5}
                required
              />
            </div>
            <div className="full" style={{ marginTop: "0.25rem" }}>
              <Button variant="primary" size="lg" iconRight="Send" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send message"}
              </Button>
            </div>
            {status === "error" ? (
              <p className="full" role="alert" style={{ color: "var(--error, #b42318)", margin: 0 }}>
                {errorMessage}
              </p>
            ) : null}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
