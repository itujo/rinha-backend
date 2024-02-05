export class UnprocessableEntityError extends Error {
	public readonly statusCode = 422;

	public readonly code;

	constructor(message: string, code?: number) {
		super("Unprocessable Entity");
		this.name = "UnprocessableEntityError";
		this.message = message;
		this.code = code;
	}
}
