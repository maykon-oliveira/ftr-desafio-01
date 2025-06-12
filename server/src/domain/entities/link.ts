export class Link {
	private constructor(
		public id: string | null,
		public originalUrl: string,
		public shortCode: string,
		public createdAt: Date,
	) {}

	static create(originalUrl: string, shortCode: string): Link {
		if (!originalUrl || !shortCode) {
			throw new Error("Original URL and short code must be provided.");
		}

		return new Link(null, originalUrl, shortCode, new Date());
	}
}
