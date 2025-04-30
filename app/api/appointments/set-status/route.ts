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
      email: email,
      property: property,
      date: date,
      time: time,
      status: status,
    }),
  );

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `Filinvest: Appointment ${status}!`,
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
