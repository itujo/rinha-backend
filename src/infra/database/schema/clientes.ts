import { relations } from "drizzle-orm";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { saldos } from "./saldos";

export const clientes = pgTable("clientes", {
	id: serial("id").primaryKey().notNull(),
	nome: varchar("nome", { length: 50 }).notNull(),
	limite: integer("limite").notNull(),
});

export const clientesRelations = relations(clientes, ({ one }) => ({
	saldos: one(saldos, {
		fields: [clientes.id],
		references: [saldos.clienteId],
	}),
}));
