import { BalanceRepository } from "../../../../infra/repositories";

export function makeBalanceRepository() {
	return new BalanceRepository();
}
