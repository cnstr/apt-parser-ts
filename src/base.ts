export class CaseCopyMap extends Map<string, string> {
	set(key: string, value: string): this {
		super.set(`case_copying${key.toLowerCase()}`, key)
		return super.set(key, value)
	}

	get(key: string): string | undefined {
		if (super.has(key)) return super.get(key)

		// Handle case insensitivity
		const actualKey = super.get(`case_copying${key.toLowerCase()}`)
		if (actualKey) return super.get(actualKey)
	}


	public get size() : number {
		return super.size / 2
	}

}

export class APTBase {
	/**
	 * Raw-accessible key-value map of the APT format
	 */
	protected raw: CaseCopyMap

	/**
	 * Base constructor.
	 * This should never be used.
	 */
	constructor() {
		this.raw = new CaseCopyMap()
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
