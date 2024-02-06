type Transaction = {
	valor: number;
	tipo: "c" | "d";
	descricao: string;
};

type ValidationResult<T> =
	| { success: true; data: T }
	| { success: false; errors: ErrorObj[] };

type ErrorObj = {
	field: string;
	message: string;
};

export function validateTransactionRequest(
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	data: any,
): ValidationResult<Transaction> {
	const errors: ErrorObj[] = [];

	if (
		typeof data.valor !== "number" ||
		!Number.isInteger(data.valor) ||
		data.valor <= 0
	) {
		errors.push({
			field: "valor",
			message: "Campo 'valor' deve ser um número inteiro positivo.",
		});
	}

	if (data.tipo !== "c" && data.tipo !== "d") {
		errors.push({
			field: "tipo",
			message: "Campo 'tipo' deve ser 'c' ou 'd'.",
		});
	}

	if (
		typeof data.descricao !== "string" ||
		data.descricao.length < 1 ||
		data.descricao.length > 10
	) {
		errors.push({
			field: "descricao",
			message: "Campo 'descricao' deve ser uma string de 1 a 10 caracteres.",
		});
	}

	if (errors.length > 0) {
		return { success: false, errors };
	}

	return { success: true, data: data as Transaction };
}
