import type { Config } from "drizzle-kit";
import env from "./src/main/config/environments/database";

const {
	postgres: { username, password, db, host },
} = env;

const databaseUrl = `postgres://${username}:${password}@${host}:5432/${db}`;

export default {
	schema: "./src/infra/database/schema/index.ts",
	out: "./drizzle",
	driver: "pg",
	dbCredentials: {
		connectionString: databaseUrl,
	},
} satisfies Config;
