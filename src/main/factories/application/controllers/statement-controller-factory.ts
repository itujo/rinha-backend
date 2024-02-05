import { StatementController } from "../../../../application/controllers";
import { makeStatementService } from "../../domain/services";

export function makeStatementController() {
	return new StatementController(makeStatementService());
}
