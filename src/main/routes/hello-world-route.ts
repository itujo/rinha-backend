import { TemplatedApp } from "uWebSockets.js";

export default (app: TemplatedApp): void => {
	app.get("/hello", (res, _req) => {
		res.writeHeader("Content-Type", "application/json");
		res.writeStatus("200").end(JSON.stringify({ message: "hello world!" }));
	});
};
