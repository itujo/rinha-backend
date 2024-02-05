import { z } from "zod";

export const TransactionSchema = z.object({
	valor: z.number().int().positive(),
	tipo: z.union([z.literal("c"), z.literal("d")]),
	descricao: z.string().min(1).max(10),
});
