import * as React from "react";
import { Resend } from "resend";
import EmailTemplate from "@/components/EmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { name, email, subject, message } = payload;

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "isabellalizaarias11@gmail.com",
      subject: `Mensaje desde el Portafolio - ${subject}`,
      react: EmailTemplate({
        name: name,
        email: email,
        message: message,
      }) as React.ReactElement,
    });

    if (error) return Response.json({ error }, { status: 500 });

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
