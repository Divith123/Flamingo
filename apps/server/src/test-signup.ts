import { auth } from "@flamingo/auth";

async function testSignup() {
  try {
    console.log("Testing signUpEmail...");
    const result = await auth.api.signUpEmail({
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "test1234",
      },
    });
    console.log("Success!", result);
  } catch (error: any) {
    console.error("Error:", error.message);
    console.error("Stack:", error.stack?.split("\n").slice(0, 5).join("\n"));
  }
}

testSignup();
