"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "../ui/Icon";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";

/**
 * ContactForm — designed success state on submit.
 * NOTE: this does not yet send email. Wire `onSubmit` to a form service
 * (e.g. Formspree, Resend, or a Next.js Route Handler / Server Action).
 */
export function ContactForm({
  successTitle = "Thank you — message sent",
  successBody = "I'll be in touch within a couple of working days to arrange your discovery call.",
}: {
  successTitle?: string;
  successBody?: string;
}) {
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="formcard">
      <AnimatePresence mode="wait">
        {sent ? (
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
            <Button variant="secondary" onClick={() => setSent(false)}>
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
            <Input label="Name" placeholder="Your name" required />
            <Input label="Company name" placeholder="Your company" />
            <Input label="Email" type="email" placeholder="you@company.co.uk" required />
            <Input label="Phone" optional placeholder="07712 120 104" />
            <div className="full">
              <Textarea
                label="How can I help?"
                placeholder="Tell me a little about where you are and what you're trying to achieve…"
                rows={5}
              />
            </div>
            <div className="full" style={{ marginTop: "0.25rem" }}>
              <Button variant="primary" size="lg" iconRight="Send" type="submit">
                Send message
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
