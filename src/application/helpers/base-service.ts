import { LoggingManager } from "../../domain/interfaces";

export abstract class BaseService {
	protected traceId?: string;

	constructor(protected readonly logger: LoggingManager) {}

	protected log(
		severity: LoggingManager.SeverityKeys,
		message: string,
		object?: Record<string, any>,
		type: "service" | "worker" | "controller" = "service",
	): void {
		this.logger.writeLog(
			severity,
			`[${type}] ${this.constructor.name}: ${message}`,
			{
				traceId: this.traceId,
				...object,
			},
		);
	}
}
