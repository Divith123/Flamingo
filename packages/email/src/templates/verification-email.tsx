/** @jsxImportSource react */
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  url?: string;
  name?: string;
}

export function VerificationEmail({
  url = "http://localhost:3000",
  name = "there",
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Flamingo Suite account</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Verify your email</Heading>
          <Text style={text}>Welcome to the Flamingo Suite.</Text>
          <Text style={text}>
            Hi {name}, please click the button below to verify your email
            address and complete your registration for Flamingo Suite.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={url}>
              Verify Email
            </Button>
          </Section>
          <Text style={text}>
            If you didn't create an account, you can safely ignore this email.
          </Text>
          <Text style={footer}>This link will expire in 24 hours.</Text>
        </Container>
      </Body>
    </Html>
  );
}

export default VerificationEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  borderRadius: "5px",
  maxWidth: "600px",
  border: "1px solid #e6e6e6",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 48px",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#008ef0",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 30px",
};

const footer = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
  padding: "0 48px",
  marginTop: "20px",
  textAlign: "center" as const,
};
