import postgres from "postgres";
import databaseEnv from "../../main/config/environments/database";

const {
	postgres: { username, password, db: database, host },
} = databaseEnv;

const databaseUrl = `postgres://${username}:${password}@${host}:5432/${database}`;

const sql = postgres(databaseUrl);

export { sql };
