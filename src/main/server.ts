import "dotenv/config";
import { App, TemplatedApp } from "uWebSockets.js";
import { setupRoutes } from "./config/app";
import env from "./config/environments/application";
import { makeLogging } from "./factories/infra";

class ServerSetup {
	private app!: TemplatedApp;
	private logger = makeLogging();

	public async start(): Promise<void> {
		this.app = App();

		setupRoutes(this.app);

		this.app.listen(env.port, () => {
			this.logger.info(`[🚀]: Server running on port ${env.port}`);
		});
	}

	public async stop(): Promise<void> {
		this.logger.info("closing connections");

		this.app.close();

		process.exitCode = 0;
	}
}

const serviceSetup = new ServerSetup();

serviceSetup.start().catch((error) => {
	console.error("failed to start the server:", error);
	process.exit(1);
});

process.on("SIGTERM", () => {
	serviceSetup
		.stop()
		.then(() => {
			process.exit(0);
		})
		.catch((error) => {
			console.error("failed to stop the server gracefully:", error);
			process.exit(1);
		});
});
