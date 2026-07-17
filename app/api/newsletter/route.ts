import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAILERLITE_API_URL = "https://connect.mailerlite.com/api/subscribers";

export async function POST(request: Request) {
  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupIdRaw = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey || !groupIdRaw) {
    return NextResponse.json(
      { message: "Newsletter signup is not configured yet." },
      { status: 500 },
    );
  }

  const groupIdDigits = groupIdRaw.replace(/\D+/g, "");
  if (!groupIdDigits) {
    return NextResponse.json(
      { message: "Newsletter signup is misconfigured: group id must be numeric." },
      { status: 500 },
    );
  }

  // MailerLite group IDs can exceed JS safe integer range, so keep as digit string.
  const groupId = groupIdDigits;

  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const response = await fetch(MAILERLITE_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      groups: [groupId],
      status: "active",
    }),
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | { message?: string; errors?: Record<string, string[] | string> }
    | null;

  if (!response.ok) {
    const firstError = payload?.errors
      ? Object.values(payload.errors)[0]
      : undefined;

    const apiError = Array.isArray(firstError)
      ? firstError[0]
      : typeof firstError === "string"
        ? firstError
        : payload?.message;

    return NextResponse.json(
      { message: apiError || "Unable to subscribe right now. Please try again later." },
      { status: response.status },
    );
  }

  return NextResponse.json({ message: "You’re subscribed. Watch your inbox for the next update." });
}