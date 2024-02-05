export class BadRequestError extends Error {
	public readonly statusCode = 400;

	public readonly code: number | undefined;

	constructor(message: string, code?: number) {
		super("Bad Request");
		this.name = "BadRequestError";
		this.message = message;
		this.code = code;
	}
}
