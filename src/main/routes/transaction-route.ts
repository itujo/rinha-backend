import { TemplatedApp } from "uWebSockets.js";
import { getHttpError } from "../../application/helpers";
import { makeTransactionController } from "../factories/application/controllers";

export default async (app: TemplatedApp): Promise<void> => {
	const transactionController = makeTransactionController();
	app.post("/clientes/:clientId/transacoes", async (res, req) =>
		transactionController.handle(res, req).catch((e) => getHttpError(res, e)),
	);
};
