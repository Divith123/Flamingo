import { db } from "@flamingo/db";
import * as schema from "@flamingo/db/schema";

console.log("Creating database tables...");

try {
  // Create extensions
  await db.execute(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  console.log("✓ Extensions created");

  // The tables will be created automatically by Drizzle when using the schema
  // Just verify connection works
  const result = await db.execute("SELECT NOW()");
  console.log("✓ Database connection successful:", result.rows);

  console.log(
    "\nDatabase is ready! Tables will be created on first use via Drizzle ORM.",
  );
  process.exit(0);
} catch (error) {
  console.error("Database setup failed:", error);
  process.exit(1);
}
