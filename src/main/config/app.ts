import { readdirSync } from "fs";
import path from "path";
import { TemplatedApp } from "uWebSockets.js";

export async function setupRoutes(app: TemplatedApp) {
	app.get("/", (res) => {
		res.writeStatus("200").end("ok");
	});

	const routesPath = path.resolve(__dirname, "..", "routes");
	const files = readdirSync(routesPath).filter(
		(file) => file.includes("-route") && !file.endsWith(".map"),
	);

	for await (const file of files) {
		const routeModule = await import(path.resolve(routesPath, file));

		routeModule.default(app);
	}
}
