export * from './release'

export function parseKV(data: string) {
	const cleanedData = data.replaceAll(/\r\n|\r|\n/g, '\n').replaceAll(/\0/g, '').normalize().trim()
	const lineChunks = cleanedData.split('\n') // We know it will always be \n because of our cleanup

	const fields = new Map<string, string>()
	let previousKey = ''

	for (const line of lineChunks) {
		if (line.length === 0) {
			continue
		}

		const match = line.match(/^(.*?): (.*)/)
		const cleanLine = line.trim().normalize()

		// No match means that there is a multiline key value to append to the previous key
		// It could mean that or also that someone supplied a key without a value in their file
		if (!match) {
			if (cleanLine.endsWith(':')) {
				const key = cleanLine.slice(0, -1) // Chop off the ':'
				fields.set(key, '') // Temporary blank value that'll be added to later or stay empty
				previousKey = key
			} else if (previousKey !== '') {
				// This check above is to make sure we are actually adding to a previous key
				// Without that check we may be adding orphaned text in the file

				// Not the same as cleanLine because appended lines shouldn't remove their leading spaces
				const appendLine = line.trimEnd().normalize()
				const existingContent = fields.get(previousKey) ?? ''

				if (cleanLine === '.') { // On APT files this signifies a newline/separation
					fields.set(previousKey, existingContent + '\n')
				} else {
					// Incase we accidentally created situations where there are double spaces, let's clean them
					const appendContent = (existingContent + appendLine).replace(/\s+/g, ' ').trim()
					fields.set(previousKey, appendContent)
				}
			}

			continue
		}

		const [_array, key, value] = match
		if (!key || !value) {
			continue
		}

		if (fields.has(key)) {
			// Duplicate key, we can skip this
			continue
		}

		fields.set(key, value)
		previousKey = key
	}


	return fields
}

export function parsePackages(data: string) {
	const cleanedData = data.replaceAll(/\r\n|\r|\n/g, '\n').replaceAll(/\0/g, '').normalize().trim()
	const packageChunks = cleanedData.split('\n\n') // We know it will always be \n\n because of our cleanup
	return packageChunks.map(chunk => parseKV(chunk))
}

export function parseControl(data: string) {
	return parsePackages(data)
}

/**
 * Parse raw file contents of a release file and retrieve a map of keys and values
 *
 * @deprecated Use the `Release` class instead
 * @param data Raw string contents from a Release file
 * @returns Map of string keys and values
 */
export function parseRelease(data: string) {
	const mapped = parseKV(data)

	// Let's make hashes into an object with all files
	type Hash = {
		filename: string
		hash: string
		size: number
	}

	const hashes = ['SHA1', 'MD5Sum', 'SHA256', 'SHA512']
	for (const [key, value] of mapped) {
		if (!hashes.includes(key)) {
			continue
		}

		const chunks = value.split(' ')
		const hashmap = new Array<Hash>()

		// Hashes are mapped into 3 space separated strings
		for (let iter = 0; iter < chunks.length; iter += 3) {
			const chunk = chunks.slice(iter, iter + 3)
			hashmap.push({
				filename: chunk[2],
				hash: chunk[0],
				size: parseInt(chunk[1], 10)
			})
		}

		const appender = mapped as Map<string, string | Hash[]>
		appender.set(key, hashmap)
	}

	return mapped
}
