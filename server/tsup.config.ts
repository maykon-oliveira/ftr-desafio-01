import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src", "!src/**/*.test.ts", "!src/**/*.spec.ts", "!src/infrastructure/db/migrations"],
	format: ["esm"],
	clean: true,
});
