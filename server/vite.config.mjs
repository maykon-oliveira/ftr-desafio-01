import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { loadEnvFile } from "node:process";

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		env: loadEnvFile(".env"),
	},
});
