export class NotFoundError extends Error {
	public readonly statusCode = 404;

	public readonly code;

	constructor(message: string, code?: number) {
		super("Not Found");
		this.name = "NotFoundError";
		this.message = message;
		this.code = code;
	}
}
