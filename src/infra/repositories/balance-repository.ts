import { eq } from "drizzle-orm";
import { clientes, db, saldos } from "../database";

export class BalanceRepository {
	async updateBalanceByClientId(clientId: number, newBalance: number) {
		const [balance] = await db
			.update(saldos)
			.set({ valor: newBalance })
			.where(eq(clientes.id, clientId))
			.returning();

		return balance;
	}
}
