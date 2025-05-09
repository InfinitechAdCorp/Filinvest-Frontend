import AppointmentStatus from "@/emails/appointmentStatus";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, property, date, time, status } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const html = await render(
    AppointmentStatus({
      baseURL: process.env.NEXT_PUBLIC_BASE_URL!,
      s3URL: process.env.NEXT_PUBLIC_S3_URL!,
      email,
      property,
      date,
      time,
      status,
    })
  );
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: `Filinvest: Appointment ${status}!`,
    html, // ✅ now it's a string, not a Promise
  };
  

  

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email info:", info);
    return Response.json({ code: 200, message: "Email Sent Successfully" });
  } catch (error) {
    console.error("Email error:", error);
    return Response.json({
      code: 500,
      message: "Something Went Wrong",
      error: String(error),
    });
  }
}
