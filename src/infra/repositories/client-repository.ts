import { Cliente, sql } from "../database";

type FindClientById = Cliente & { saldo: number };

export class ClientRepository {
	async findClientById(clientId: number) {
		const [client] = await sql<FindClientById[]>`
			SELECT c.id, c.nome, c.limite, s.valor AS saldo
			FROM clientes c
			INNER JOIN saldos s ON c.id = s.cliente_id
			WHERE c.id = ${clientId};
		`;

		return client;
	}
}
