export class DuplicateShortUrlError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "DuplicateShortUrlError";
	}
}
