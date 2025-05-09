import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  email: string;
};

export const NewSubscriber = ({
  email,
}: Props) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const s3URL = process.env.NEXT_PUBLIC_S3_URL;

  return (
    <Html>
      <Head />
      <Preview>Thank You for Subscribing</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img alt="Logo" height="80" src={`${s3URL}/assets/logo.png`} />
          </Section>

          <Hr style={divider} />
          <Text style={paragraph}>Good Day!</Text>
          <Text style={paragraph}>
            Thank you for subscribing to the Filinvest newsletter! We&apos;re
            excited to keep you updated on the latest properties, exclusive
            offers, and real estate insights.
          </Text>
          <Hr style={divider} />
          <Text style={paragraph}>
            Stay tuned for our upcoming announcements, and feel free to reach
            out if you have any questions or specific property preferences.
          </Text>
          <Button href={process.env.NEXT_PUBLIC_BASE_URL} style={button}>
  Visit Our Website
</Button>

          <Hr style={divider} />
          {/* <Text style={paragraphs}>
            If you ever wish to unsubscribe, you can do so by clicking{" "}
            <Link
              href={`${baseURL}/subscribers/unsubscribe/${email}`}
              style={anchor}
            >
              here
            </Link>
          </Text> */}
          <Hr style={divider} />
          <Text style={footer}>
            Metro Manila, Philippines
            <br />
            LandLine: 02-8646-6136 | Mobile: (+63) 917 5481 097
            <br />
            Email: filinvest@gmail.com | Website:{" "}
            <Link href={baseURL} style={anchor}>
            filinvest-main-frontend.vercel.app
            </Link>
            <br />
            Office Hours: Monday to Friday, 8:00 AM - 5:00 PM
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default NewSubscriber;

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

const button = {
  backgroundColor: "#0070f3",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center" as const,
  padding: "12px 24px",
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
