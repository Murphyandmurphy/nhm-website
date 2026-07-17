"use client";

import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

type Status = "idle" | "loading" | "success" | "error";

const SUCCESS_MESSAGE = "You’re subscribed. Watch your inbox for the next update.";
const DEFAULT_ERROR = "Something went wrong. Please try again in a moment.";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus("error");
        setMessage(data?.message || DEFAULT_ERROR);
        return;
      }

      setStatus("success");
      setMessage(data?.message || SUCCESS_MESSAGE);
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(DEFAULT_ERROR);
    }
  };

  return (
    <div className="newsletter">
      <p className="footer__h">Newsletter</p>
      <p className="newsletter__copy">Monthly strategic marketing notes, practical growth ideas, and fresh insights for food and drink brands.</p>
      <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
        <Input
          aria-label="Email address"
          autoComplete="email"
          className="newsletter__input"
          id="newsletter-email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.co.uk"
          required
          type="email"
          value={email}
        />
        <Button size="sm" type="submit" variant="onblue" disabled={status === "loading"}>
          {status === "loading" ? "Joining..." : "Join"}
        </Button>
      </form>
      <p className="newsletter__meta">By subscribing, you agree to receive email updates. You can unsubscribe at any time.</p>
      {message ? (
        <p className={`newsletter__message newsletter__message--${status}`} role={status === "error" ? "alert" : "status"}>
          {message}
        </p>
      ) : null}
    </div>
  );
}