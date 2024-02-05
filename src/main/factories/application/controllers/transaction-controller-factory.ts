import { TransactionController } from "../../../../application/controllers";
import { makeTransactionService } from "../../domain/services";

export function makeTransactionController() {
	return new TransactionController(makeTransactionService());
}
