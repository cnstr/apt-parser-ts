export class MissingRequiredKeyError extends Error {
	constructor(key: string) {
		super()

		this.name = 'MissingRequiredKeyError'
		this.message = `Missing Required APT Key: ${key}`
	}
}
