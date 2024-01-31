import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config({
    path: '.env.local',
});

export default {
    driver: "mysql2",
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
	uri: process.env.DATABASE_URL,
    }
} as Config;
