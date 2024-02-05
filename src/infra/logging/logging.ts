import pino from "pino";
import { LoggingManager } from "../../domain/interfaces/logging";

type objectOrMessageType = string | Error | Record<string, any>;

export class PinoLoggingAdapter implements LoggingManager {
	private readonly pino: pino.Logger;

	constructor() {
		this.pino = pino({
			messageKey: "message",
			level: "debug",
			timestamp: false,
			formatters: {
				level: this.mapLevelToSeverity.bind(this),
			},
		});
	}

	private mapLevelToSeverity(
		label: string,
		level: number,
	): Record<string, string | number> {
		const mapLevelToSeverity = new Map([
			["trace", "DEBUG"],
			["debug", "DEBUG"],
			["info", "INFO"],
			["warn", "WARNING"],
			["error", "FATAL"],
			["fatal", "CRITICAL"],
		]);
		const severity =
			mapLevelToSeverity.get(label.toLocaleLowerCase()) ?? "DEFAULT";
		return { severity, level };
	}

	writeLog(
		severity: LoggingManager.SeverityKeys,
		message: string,
		object?: Error | Record<string, any>,
	): void {
		this?.[severity](object ?? message, object ? message : undefined);
	}

	debug(objectOrMessage: objectOrMessageType, message?: string): void {
		if (typeof objectOrMessage === "string") {
			this.pino.debug(objectOrMessage);
		} else if (objectOrMessage instanceof Error) {
			const errorMessage =
				message ?? objectOrMessage.message ?? objectOrMessage.stack;
			this.pino.debug(objectOrMessage, errorMessage);
		} else {
			this.pino.debug(objectOrMessage, message);
		}
	}

	info(objectOrMessage: objectOrMessageType, message?: string): void {
		if (typeof objectOrMessage === "string") {
			this.pino.info(objectOrMessage);
		} else if (objectOrMessage instanceof Error) {
			const errorMessage =
				message ?? objectOrMessage.message ?? objectOrMessage.stack;
			this.pino.info(objectOrMessage, errorMessage);
		} else {
			this.pino.info(objectOrMessage, message);
		}
	}

	warn(objectOrMessage: objectOrMessageType, message?: string): void {
		if (typeof objectOrMessage === "string") {
			this.pino.warn(objectOrMessage);
		} else if (objectOrMessage instanceof Error) {
			const errorMessage =
				message ?? objectOrMessage.message ?? objectOrMessage.stack;
			this.pino.warn(objectOrMessage, errorMessage);
		} else {
			this.pino.warn(objectOrMessage, message);
		}
	}

	error(objectOrMessage: objectOrMessageType, message?: string): void {
		if (typeof objectOrMessage === "string") {
			this.pino.error(objectOrMessage);
		} else if (objectOrMessage instanceof Error) {
			const errorMessage =
				message ?? objectOrMessage.message ?? objectOrMessage.stack;
			this.pino.error(objectOrMessage, errorMessage);
		} else {
			this.pino.error(objectOrMessage, message);
		}
	}

	fatal(objectOrMessage: objectOrMessageType, message?: string): void {
		if (typeof objectOrMessage === "string") {
			this.pino.fatal(objectOrMessage);
		} else if (objectOrMessage instanceof Error) {
			const errorMessage =
				message ?? objectOrMessage.message ?? objectOrMessage.stack;
			this.pino.fatal(objectOrMessage, errorMessage);
		} else {
			this.pino.fatal(objectOrMessage, message);
		}
	}
}
