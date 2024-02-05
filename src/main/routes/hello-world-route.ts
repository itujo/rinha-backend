import { TemplatedApp } from "uWebSockets.js";

export default async (app: TemplatedApp): Promise<void> => {
	app.get("/hello", async (res, _req) => {
		res.writeHeader("Content-Type", "application/json");

		res.writeStatus("200").end(JSON.stringify({ message: "hello world!" }));
	});
};
