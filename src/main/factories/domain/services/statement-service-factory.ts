import { StatementService } from "../../../../domain/services";
import { makeLogging } from "../../infra";
import {
	makeClientRepository,
	makeTransactionRepository,
} from "../../infra/repositories";

export function makeStatementService() {
	return new StatementService(
		makeClientRepository(),
		makeTransactionRepository(),
		makeLogging(),
	);
}
