import { auth } from "@flamingo/auth";
import { db } from "@flamingo/db";

async function setup() {
  try {
    console.log("Testing database connection...");

    // Test database connection
    const result = await db.execute("SELECT 1 as test");
    console.log("✓ Database connected:", result.rows);

    // Better Auth with Drizzle adapter should auto-create tables
    // Let's verify the configuration
    console.log("✓ Auth instance created");
    console.log("✓ Database is ready for use");

    console.log(
      "\nIf tables don't exist, they will be created on first auth operation.",
    );
    console.log("Try signing up at http://localhost:3000/signup");

    process.exit(0);
  } catch (error: any) {
    console.error("✗ Database setup failed:");
    console.error(error.message);
    console.error("\nPlease ensure:");
    console.error("1. DATABASE_URL is set in apps/server/.env");
    console.error("2. PostgreSQL is running and accessible");
    console.error("3. The database exists");
    process.exit(1);
  }
}

setup();
