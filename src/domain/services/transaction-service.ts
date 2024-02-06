import {
	NotFoundError,
	UnprocessableEntityError,
} from "../../application/errors";
import { BaseService } from "../../application/helpers";
import {
	BalanceRepository,
	ClientRepository,
	TransactionRepository,
} from "../../infra/repositories";
import { LoggingManager } from "../interfaces";

export class TransactionService extends BaseService {
	constructor(
		private readonly clientRepository: ClientRepository,
		private readonly transactionRepository: TransactionRepository,
		private readonly balanceRepository: BalanceRepository,
		protected readonly logger: LoggingManager,
	) {
		super(logger);
	}

	async makeTransaction(
		clientId: number,
		transaction: { amount: number; type: string; description: string },
	) {
		const cliente = await this.clientRepository.findClientById(clientId);
		if (!cliente?.saldos) {
			this.log("error", "could not find client with this id", { clientId });
			throw new NotFoundError("Cliente não encontrado");
		}

		if (
			transaction.type === "d" &&
			cliente.saldos.valor - transaction.amount < -cliente.limite
		) {
			this.log("error", "client has insufficient funds", {
				clientId,
				saldos: cliente.saldos,
			});

			throw new UnprocessableEntityError("Saldo insuficiente para débito");
		}

		const novoSaldo =
			transaction.type === "c"
				? cliente.saldos.valor + transaction.amount
				: cliente.saldos.valor - transaction.amount;

		await this.transactionRepository.create({
			clienteId: clientId,
			descricao: transaction.description,
			tipo: transaction.type,
			valor: transaction.amount,
		});

		await this.balanceRepository.updateBalanceByClientId(clientId, novoSaldo);

		return {
			limite: cliente.limite,
			saldo: novoSaldo,
		};
	}
}
