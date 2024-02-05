import { HttpRequest, HttpResponse } from "uWebSockets.js";
import { ZodError } from "zod";
import { TransactionService } from "../../domain/services";
import { TransactionSchema } from "../../domain/validation/schemas";
import { readJson } from "../../infra/utils";
import { BadRequestError } from "../errors";
import { ok } from "../helpers";

export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}
	async handle(res: HttpResponse, req: HttpRequest): Promise<void> {
		const clientId = +req.getParameter(0);
		const data = await readJson(res);

		const validation = TransactionSchema.safeParse(data);

		if (!validation.success) {
			throw new ZodError(validation.error.issues);
		}

		const response = await this.transactionService.makeTransaction(clientId, {
			amount: validation.data.valor,
			description: validation.data.descricao,
			type: validation.data.tipo,
		});

		ok(res, { ...response });
	}
}
