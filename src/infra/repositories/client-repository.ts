import { eq } from "drizzle-orm";
import { clientes, db } from "../database";

export class ClientRepository {
	async findClientById(clientId: number) {
		return await db.query.clientes.findFirst({
			with: {
				saldos: true,
			},
			where: eq(clientes.id, clientId),
		});
	}
}
