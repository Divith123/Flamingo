/** @jsxImportSource react */
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

interface WelcomeEmailProps {
  username?: string;
  loginUrl?: string;
}

export function WelcomeEmail({
  username = "there",
  loginUrl = "http://localhost:3000",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Flamingo: Your Unified Business OS</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Flamingo</Heading>
          <Text style={text}>Hi {username},</Text>
          <Text style={text}>
            Thank you for joining Flamingo. You've just unlocked a unified
            platform designed to run your entire business from one place.
          </Text>
          <Section style={suiteSection}>
            <Text style={suiteHeading}>Your Integrated Suite:</Text>
            <Text style={suiteItem}>
              • Financials: Books, Expense, Payroll, Billing
            </Text>
            <Text style={suiteItem}>
              • Operations: Inventory, ERP, Procurement
            </Text>
            <Text style={suiteItem}>
              • Commerce: Payments, Checkout, Storefront
            </Text>
            <Text style={suiteItem}>• Productivity: Sign, Practice</Text>
          </Section>
          <Section style={buttonContainer}>
            <Button style={button} href={loginUrl}>
              Launch Dashboard
            </Button>
          </Section>
          <Text style={footer}>
            One account. One platform. All your business needs.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export default WelcomeEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "24px 0 48px",
  marginBottom: "64px",
  borderRadius: "12px",
  maxWidth: "600px",
  border: "1px solid #e1e1e1",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "28px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#444",
  fontSize: "16px",
  lineHeight: "26px",
  padding: "0 48px",
};

const suiteSection = {
  margin: "24px 48px",
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  border: "1px solid #f1f1f1",
};

const suiteHeading = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#666",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  marginBottom: "12px",
};

const suiteItem = {
  fontSize: "15px",
  color: "#333",
  lineHeight: "1.5",
  margin: "4px 0",
};

const buttonContainer = {
  padding: "27px 0 27px",
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const footer = {
  color: "#999",
  fontSize: "13px",
  lineHeight: "22px",
  padding: "0 48px",
  marginTop: "24px",
  textAlign: "center" as const,
};
