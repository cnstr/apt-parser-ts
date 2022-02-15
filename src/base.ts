export class APTBase {
	/**
	 * Raw-accessible key-value map of the APT format
	 */
	protected raw: Map<string, string>

	/**
	 * Base constructor.
	 * This should never be used.
	 */
	constructor() {
		this.raw = new Map()
	}

	/**
	 * Get a raw string value from the raw contents
	 * @param {string} key raw field name to search for
	 * @returns {string?} Field value
	 */
	 get(key: string): string | undefined {
		return this.raw.get(key)
	}

	/**
	 * Retrieve the number of fields defined in the raw contents
	 * @returns {number} Field count
	 */
	get fieldCount(): number {
		return this.raw.size
	}
}
