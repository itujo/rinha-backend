import { HttpResponse } from "uWebSockets.js";
import { ZodError } from "zod";
import {
	BadRequestError,
	ForbiddenError,
	InternalServerError,
	NotFoundError,
} from "../errors";

type errorTypes =
	| BadRequestError
	| NotFoundError
	| ForbiddenError
	| InternalServerError;

export const ok = (res: HttpResponse, data: Record<string, any>) => {
	res.writeHeader("Content-Type", "application/json");
	res.writeStatus("200");
	res.end(JSON.stringify(data));
};

export const created = (res: HttpResponse, data: Record<string, any>) => {
	res.writeHeader("Content-Type", "application/json");
	res.writeStatus("201");
	res.end(JSON.stringify(data));
};

export const noContent = () => (res: HttpResponse) => {
	res.writeHeader("Content-Type", "application/json");
	res.writeStatus("204");
	res.endWithoutBody();
};

export const getHttpError = (res: HttpResponse, error: errorTypes) => {
	if (error instanceof ZodError) {
		res.writeStatus("400");
		res.writeHeader("Content-Type", "application/json");
		res.end(
			JSON.stringify({
				error: {
					code: "VALIDATION_FAILED",
					details: error.issues,
				},
			}),
		);
	} else {
		res
			.writeStatus(`${error.statusCode || 500}`)
			.writeHeader("Content-Type", "application/json")
			.end(
				JSON.stringify({
					code: error?.code,
					error: { ...error, message: error.message },
				}),
			);
	}
};
