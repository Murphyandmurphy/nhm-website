import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_API_URL = "https://api.resend.com/emails";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return NextResponse.json(
      { message: "The contact form is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 120) {
    return NextResponse.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (!message || message.length > 5000) {
    return NextResponse.json({ message: "Please enter a message of up to 5,000 characters." }, { status: 400 });
  }
  if (company.length > 160 || phone.length > 40) {
    return NextResponse.json({ message: "Please check the company and phone fields." }, { status: 400 });
  }

  const text = [
    "New website contact enquiry",
    "",
    `Name: ${name}`,
    `Company: ${company || "Not provided"}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  let response: Response;
  try {
    response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Website enquiry from ${name.replace(/[\r\n]+/g, " ")}`,
        text,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to send your message right now. Please try again later." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { message: "Unable to send your message right now. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Your message has been sent." });
}