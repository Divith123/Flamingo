import { env } from "@flamingo/env/server";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { Users } from "./payload/collections/Users";

export default buildConfig({
  editor: lexicalEditor(),
  collections: [Users, Media, Pages],
  secret: env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  admin: {
    meta: {
      titleSuffix: "- flamingo",
    },
  },
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
});
