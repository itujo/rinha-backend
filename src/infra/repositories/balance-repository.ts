import { sql } from "../database";

export class BalanceRepository {
	async updateBalanceByClientId(clientId: number, newBalance: number) {
		await sql`
			UPDATE saldos
			SET valor = ${newBalance}
			WHERE cliente_id = ${clientId};
		`;
	}
}
