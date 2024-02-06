import { Transacao, sql } from "../database";

export type TransactionInsert = {
	clienteId: number;
	valor: number;
	tipo: "c" | "d";
	descricao: string;
};

export class TransactionRepository {
	async create(transaction: TransactionInsert) {
		await sql`
			INSERT INTO transacoes (cliente_id, valor, tipo, descricao, realizada_em)
			VALUES (${transaction.clienteId}, ${transaction.valor}, ${transaction.tipo}, ${transaction.descricao}, NOW());
		`;
	}

	async getLastTransactions(clientId: number, maxItems: number) {
		return await sql<Transacao[]>`
			SELECT t.*
			FROM transacoes t
			WHERE t.cliente_id = ${clientId}
			ORDER BY t.realizada_em DESC
			LIMIT ${maxItems};
		`;
	}
}
