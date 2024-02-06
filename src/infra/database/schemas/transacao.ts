export type Transacao = {
	id: number;
	cliente_id: number;
	valor: number;
	tipo: "c" | "d";
	descricao: string;
	realizada_em: string;
};
