import { TemplatedApp } from "uWebSockets.js";
import { getHttpError } from "../../infra/helpers";
import { makeStatementController } from "../factories/application/controllers";

export default async (app: TemplatedApp): Promise<void> => {
	const statementController = makeStatementController();
	app.get("/clientes/:clientId/extrato", async (res, req) =>
		statementController.handle(res, req).catch((e) => getHttpError(res, e)),
	);
};
