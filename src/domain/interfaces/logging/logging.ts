export interface LoggingManager {
	debug(message: string | Error): void;
	debug(object: Record<string, any> | Error, message: string): void;

	info(message: string | Error): void;
	info(object: Record<string, any> | Error, message: string): void;

	warn(message: string | Error): void;
	warn(object: Record<string, any> | Error, message: string): void;

	error(message: string | Error): void;
	error(object: Record<string, any> | Error, message: string): void;

	fatal(message: string | Error): void;
	fatal(object: Record<string, any> | Error, message: string): void;

	writeLog(
		severity: LoggingManager.SeverityKeys,
		message: string,
		object?: Error | Record<string, any>,
	): void;
}

export namespace LoggingManager {
	export type SeverityKeys = "debug" | "info" | "warn" | "error" | "fatal";
}
