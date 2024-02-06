import { HttpResponse } from "uWebSockets.js";
import {
	BadRequestError,
	ForbiddenError,
	InternalServerError,
	NotFoundError,
} from "../../application/errors";

type errorTypes =
	| BadRequestError
	| NotFoundError
	| ForbiddenError
	| InternalServerError;

export const ok = (res: HttpResponse, data: Record<string, any>) => {
	res.cork(() => {
		res
			.writeStatus("200")
			.writeHeader("Content-Type", "application/json")
			.end(JSON.stringify(data));
	});
};

export const created = (res: HttpResponse, data: Record<string, any>) => {
	res.cork(() => {
		res
			.writeStatus("201")
			.writeHeader("Content-Type", "application/json")
			.end(JSON.stringify(data));
	});
};

export const noContent = () => (res: HttpResponse) => {
	res.cork(() => {
		res
			.writeStatus("204")
			.writeHeader("Content-Type", "application/json")
			.endWithoutBody();
	});
};

export const getHttpError = (res: HttpResponse, error: errorTypes) => {
	res.cork(() => {
		res
			.writeStatus(`${error.statusCode || 422}`)
			.writeHeader("Content-Type", "application/json")
			.end(
				JSON.stringify({
					code: error?.code,
					error: { ...error, message: error.message },
				}),
			);
	});
};
