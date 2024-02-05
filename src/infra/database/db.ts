import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import databaseEnv from "../../main/config/environments/database";
import * as schema from "./schema";

const {
	postgres: { username, password, db: database, host },
} = databaseEnv;

const databaseUrl = `postgres://${username}:${password}@${host}:5432/${database}`;

const queryClient = postgres(databaseUrl);
const db = drizzle(queryClient, { schema });

export { db };
