import { HttpResponse } from "uWebSockets.js";
import { makeLogging } from "../../main/factories/infra";

export function readJson(res: HttpResponse) {
	const logger = makeLogging();
	return new Promise((resolve, reject) => {
		const buffer: Buffer[] = [];
		res.onData((ab, isLast) => {
			buffer.push(Buffer.from(ab));
			if (isLast) {
				const data = Buffer.concat(buffer).toString();
				try {
					const json = JSON.parse(data);
					resolve(json);
				} catch (e) {
					logger.error({ e }, "failed to read json");
					reject(e);
				}
			}
		});

		res.onAborted(() => {
			reject(new Error("Request was aborted"));
		});
	});
}
