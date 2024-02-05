import { TransactionService } from "../../../../domain/services";
import { makeLogging } from "../../infra";
import {
	makeBalanceRepository,
	makeClientRepository,
	makeTransactionRepository,
} from "../../infra/repositories";

export function makeTransactionService() {
	return new TransactionService(
		makeClientRepository(),
		makeTransactionRepository(),
		makeBalanceRepository(),
		makeLogging(),
	);
}
