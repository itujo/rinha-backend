import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { clientes } from "./clientes";

export const saldos = pgTable("saldos", {
	id: serial("id").primaryKey().notNull(),
	clienteId: integer("cliente_id")
		.notNull()
		.references(() => clientes.id),
	valor: integer("valor").notNull(),
});
