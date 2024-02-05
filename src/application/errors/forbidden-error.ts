export class ForbiddenError extends Error {
	public readonly statusCode = 403;

	public readonly code: number | undefined;

	constructor(message: string, code?: number) {
		super("Forbidden");
		this.name = "ForbiddenError";
		this.message = message;
		this.code = code;
	}
}
