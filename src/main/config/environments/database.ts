import env from "env-var";

export default {
	postgres: {
		username: env.get("POSTGRES_USER").required().asString(),
		password: env.get("POSTGRES_PASSWORD").required().asString(),
		db: env.get("POSTGRES_DB").required().asString(),
		host: env.get("POSTGRES_HOST").required().asString(),
	},
} as const;
