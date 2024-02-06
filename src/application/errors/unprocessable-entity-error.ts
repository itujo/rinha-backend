export class UnprocessableEntityError extends Error {
	public readonly statusCode = 422;

	public readonly code;

	public readonly errors;

	constructor(
		message: string,
		errors?:
			| Record<string, string | number>
			| Array<Record<string, string | number>>,
		code?: number,
	) {
		super("Unprocessable Entity");
		this.name = "UnprocessableEntityError";
		this.message = message;
		this.code = code;
		this.errors = errors;
	}
}
