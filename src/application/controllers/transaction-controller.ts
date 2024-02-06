import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { TransactionService } from "../../domain/services";
import { validateTransactionRequest } from "../../domain/validation/schemas";
import { ok } from "../../infra/helpers";
import { readJson } from "../../infra/utils";
import { UnprocessableEntityError } from "../errors";

export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}
	async handle(res: HttpResponse, req: HttpRequest): Promise<void> {
		const clientId = +req.getParameter(0);
		const data = await readJson(res);

		const validation = validateTransactionRequest(data);

		if (!validation.success) {
			throw new UnprocessableEntityError(
				"Erro de validação",
				validation.errors,
			);
		}

		const response = await this.transactionService.makeTransaction(clientId, {
			amount: validation.data.valor,
			description: validation.data.descricao,
			type: validation.data.tipo,
		});

		ok(res, { ...response });
	}
}
