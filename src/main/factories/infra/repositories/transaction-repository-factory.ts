import { TransactionRepository } from "../../../../infra/repositories";

export function makeTransactionRepository() {
	return new TransactionRepository();
}
