import {
	char,
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { clientes } from "./clientes";

export const transacoes = pgTable("transacoes", {
	id: serial("id").primaryKey().notNull(),
	clienteId: integer("cliente_id")
		.notNull()
		.references(() => clientes.id),
	valor: integer("valor").notNull(),
	tipo: char("tipo", { length: 1 }).notNull(),
	descricao: varchar("descricao", { length: 10 }).notNull(),
	realizada_em: timestamp("realizada_em", { mode: "string" })
		.defaultNow()
		.notNull(),
});
