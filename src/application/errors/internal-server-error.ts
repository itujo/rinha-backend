export class InternalServerError extends Error {
	public readonly statusCode = 500;

	public readonly code: number | undefined;

	constructor(message: string, code?: number) {
		super("Internal Server Error");
		this.name = "InternalServerError";
		this.message = message;
		this.code = code;
	}
}
