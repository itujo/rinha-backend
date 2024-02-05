import { desc, eq } from "drizzle-orm";
import { db, transacoes } from "../database";

export class TransactionRepository {
	async create(transaction: typeof transacoes.$inferInsert) {
		return await db.insert(transacoes).values(transaction);
	}

	async getLastTransactions(clientId: number, maxItems: number) {
		return await db.query.transacoes.findMany({
			where: eq(transacoes.clienteId, clientId),
			limit: maxItems,
			orderBy: desc(transacoes.realizada_em),
		});
	}
}
