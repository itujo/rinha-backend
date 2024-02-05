import { eq } from "drizzle-orm";
import { clientes, db } from "../database";

export class ClientRepository {
	async findClientById(clientId: number) {
		const client = await db.query.clientes.findFirst({
			with: {
				saldos: true,
			},
			where: eq(clientes.id, clientId),
		});

		return client;
	}
}
