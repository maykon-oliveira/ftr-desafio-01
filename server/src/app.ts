import { env } from "@/config/env";
import { buildServer } from "@/infrastructure/http/server";

buildServer()
	.listen({ port: env.PORT, host: '0.0.0.0' })
	.then(() => {
		console.log(`Server is running on http://localhost:${env.PORT}`);
	});
