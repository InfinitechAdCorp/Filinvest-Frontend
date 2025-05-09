import NewSubscriber from "@/emails/newSubscriber";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const html = await render(
    NewSubscriber({
      email: email,  // Only pass email as it's the only required prop
    })
  );
  
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Filinvest: Thank You for Subscribing!",
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
    return Response.json({ code: 200, message: "Email Sent Successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({
      code: 500,
      message: "Something Went Wrong",
      error: error,
    });
  }
}
