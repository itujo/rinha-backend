import env from "env-var";

export default {
	mode: env.get("NODE_ENV").default("development").asString(),
	port: env.get("PORT").required().asPortNumber(),
} as const;
