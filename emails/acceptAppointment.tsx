import * as React from "react";
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Section,
} from "@react-email/components";

type Props = {
  baseURL: string;
  s3URL: string;
  email: string;
  property: string;
  date: string;
  time: string;
};

export const AcceptAppointment = ({
  baseURL = "http://localhost:3000",
  s3URL = "https://filinvest-bakit.s3-ap-southeast-1.amazonaws.com",
  email,
  property,
  date,
  time,
}: Props) => (
  <Html>
    <Head />
    <Preview>Your appointment for {property} has been accepted.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logo}>
          <Img alt="Logo" height="80" src={`${s3URL}/assets/logo.png`} />
        </Section>

        <Hr style={divider} />
        <Text style={paragraph}>Appointment Accepted for {property}</Text>
        <Text style={paragraph}>
          We are excited to inform you that your appointment to view the
          property <b>{property}</b> has been accepted.
        </Text>
        <Hr style={divider} />
        <Text style={paragraph}>
          <b>Appointment Details:</b>
        </Text>
        <Text style={paragraph}>
          Property: {property}
          <br />
          Date: {date}
          <br />
          Time: {time}
        </Text>
        <Hr style={divider} />
        <Text style={paragraph}>
          If you would like to request another appointment or need more
          information, please feel free to contact us or log in to your account.
        </Text>
        <Text style={paragraph}>
          If you have any questions or need assistance, our support team is here
          to help.
        </Text>
        <Text style={{ ...paragraph, textAlign: "center" }}>
          Thank you for considering Filinvest!
        </Text>
        <Hr style={divider} />
        <Text style={paragraphs}>
          If you ever wish to unsubscribe, you can do so by clicking{" "}
          <Link href={`${baseURL}/unsubscribe/${email}`} style={anchor}>
            here
          </Link>
        </Text>
        <Hr style={divider} />
        <Text style={footer}>
          Metro Manila, Philippines
          <br />
          LandLine: 02-8646-6136 | Mobile: (+63) 917 5481 097
          <br />
          Email: filinvest@gmail.com | Website:{" "}
          <Link href={baseURL} style={anchor}>
            filinvest.vercel.app
          </Link>
          <br />
          Office Hours: Monday to Friday, 8:00 AM - 5:00 PM
        </Text>
      </Container>
    </Body>
  </Html>
);

export default AcceptAppointment;

const main = {
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  padding: "24px",
  width: "100%",
  textAlign: "center" as const,
};

const logo = {
  width: "50%",
};

const divider = {
  borderColor: "#ccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const paragraphs = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  margin: "20px auto",
};

const anchor = {
  color: "#556cd6",
};
