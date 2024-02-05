import { db, transacoes } from "../database";

export class TransactionRepository {
	async create(transaction: typeof transacoes.$inferInsert) {
		return db.insert(transacoes).values(transaction);
	}
}
