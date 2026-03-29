import { auth } from "@flamingo/auth";

console.log("Better Auth API methods:");
const methods = Object.keys(auth.api)
  .filter((k) => !k.startsWith("_"))
  .sort();
methods.forEach((m) => console.log(`  - ${m}`));

console.log("\nEmail/Password methods:");
methods
  .filter(
    (m) =>
      m.toLowerCase().includes("email") || m.toLowerCase().includes("sign"),
  )
  .forEach((m) => console.log(`  - ${m}`));
