import { ClientRepository } from "../../../../infra/repositories";

export function makeClientRepository() {
	return new ClientRepository();
}
