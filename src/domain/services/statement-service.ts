import { NotFoundError } from "../../application/errors";
import { BaseService } from "../../application/helpers";
import {
	ClientRepository,
	TransactionRepository,
} from "../../infra/repositories";
import { LoggingManager } from "../interfaces";

export class StatementService extends BaseService {
	constructor(
		private readonly clientRepository: ClientRepository,
		private readonly transactionRepository: TransactionRepository,
		protected readonly logger: LoggingManager,
	) {
		super(logger);
	}

	async getStatement(clientId: number) {
		const client = await this.clientRepository.findClientById(clientId);
		if (!client) {
			this.log("error", "could not find client with this id", { clientId });
			throw new NotFoundError("Cliente não encontrado");
		}

		const transactions = await this.transactionRepository.getLastTransactions(
			clientId,
			10,
		);

		return {
			saldo: {
				total: client.saldos.valor,
				data_extrato: new Date().toISOString(),
				limite: client.limite,
			},
			ultimas_transacoes: transactions.map((tx) => ({
				valor: tx.valor,
				tipo: tx.tipo,
				descricao: tx.descricao,
				realizada_em: new Date(tx.realizada_em).toISOString(),
			})),
		};
	}
}
