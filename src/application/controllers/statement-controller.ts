import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { StatementService } from "../../domain/services";
import { ok } from "../../infra/helpers";

export class StatementController {
	constructor(private readonly statementService: StatementService) {}

	async handle(res: HttpResponse, req: HttpRequest) {
		res.onAborted(() => {
			throw new Error("Request was aborted");
		});
		const clientId = +req.getParameter(0);

		const response = await this.statementService.getStatement(clientId);

		ok(res, { ...response });
	}
}
