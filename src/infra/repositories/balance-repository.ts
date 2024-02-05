import { eq } from "drizzle-orm";
import { db, saldos } from "../database";

export class BalanceRepository {
	async updateBalanceByClientId(clientId: number, newBalance: number) {
		const [balance] = await db
			.update(saldos)
			.set({ valor: newBalance })
			.where(eq(saldos.clienteId, clientId))
			.returning();

		return balance;
	}
}
