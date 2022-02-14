import { parseKV, parseBoolean } from '.'
import { APTBase } from './base'
import type { IRelease, ReleaseHash } from './release.d'

/**
 * Class representing a release file
 *
 * For keys that are documented by Debian, we can do some strict type inference.
 * See: https://wiki.debian.org/DebianRepository/Format#A.22Release.22_files
 *
 * To meet the needs of many people, `apt-parser` will handle documented keys both ways.
 * It will populate the strictly typed fields and also leave the raw-string value and key.
 */
export class Release extends APTBase implements IRelease {
	// Begin Raw Implementation
		architectures: string[]
		noSupportForArchitectureAll?: boolean | undefined
		description?: string | undefined
		origin?: string | undefined
		label?: string | undefined
		suite: string | undefined
		codename: string | undefined
		version?: string | undefined
		date?: Date | undefined
		validUntil?: Date | undefined
		components: string[]
		md5?: ReleaseHash[] | undefined
		sha1?: ReleaseHash[] | undefined
		sha256?: ReleaseHash[] | undefined
		sha512?: ReleaseHash[] | undefined
		notAutomatic?: boolean | undefined
		butAutomaticUpgrades?: boolean | undefined
		acquireByHash?: boolean | undefined
		signedBy?: string[] | undefined
		packagesRequireAuthorization?: boolean | undefined
	// End Raw Implementation

	/**
	 * Create a type-safe Release object and populate its keys
	 * @param {string} rawData Contents of a Release file from an APT repository
	 */
	constructor(rawData: string) {
		super()

		const map = parseKV(rawData)
		this.raw = map

		this.architectures = map.get('Architectures')!.trim().split(' ')
		this.noSupportForArchitectureAll = parseBoolean(map.get('No-Support-For-Architecture-All')?.trim())

		this.description = map.get('Description')?.trim()
		this.origin = map.get('Origin')?.trim()
		this.label = map.get('Label')?.trim()

		// There must be a suite or codename but we do not enforce
		// Our solution was to make them required but nullable
		this.suite = map.get('Suite')?.trim()
		this.codename = map.get('Codename')?.trim()

		this.version = map.get('Version')?.trim()
		this.date = map.get('Date') ? new Date(map.get('Date')!) : undefined
		this.validUntil = map.get('Valid-Until') ? new Date(map.get('Valid-Until')!) : undefined
		this.components = map.get('Components')!.trim().split(' ')

		this.notAutomatic = parseBoolean(map.get('NotAutomatic')?.trim())
		this.butAutomaticUpgrades = parseBoolean(map.get('ButAutomaticUpgrades')?.trim())
		this.acquireByHash = parseBoolean(map.get('Acquire-By-Hash')?.trim())
		this.signedBy = map.get('Signed-By')?.split(',')
		this.packagesRequireAuthorization = parseBoolean(map.get('Packages-Require-Authorization')?.trim())

		// Let's make hashes into an object with all files
		const hashes = ['SHA1', 'MD5Sum', 'SHA256', 'SHA512']
		for (const [key, value] of map) {
			if (!hashes.includes(key)) {
				continue
			}

			const chunks = value.split(' ')
			const hashmap = new Array<ReleaseHash>()

			// Hashes are mapped into 3 space separated strings
			for (let iter = 0; iter < chunks.length; iter += 3) {
				const chunk = chunks.slice(iter, iter + 3)
				hashmap.push({
					filename: chunk[2],
					hash: chunk[0],
					size: parseInt(chunk[1], 10)
				})
			}

			const indice = this.getHashIndex(key) as 'sha1' | 'md5' | 'sha256' | 'sha512'
			this[indice] = hashmap
		}
	}

	/**
	 * Convert APT Release hash keys to the appropriate ones on this class
	 * @param {string} key Release hash key
	 * @returns {string?} Class property name
	 */
	private getHashIndex(key: string): string | undefined {
		switch (key) {
			case 'MD5Sum':
				return 'md5'
			case 'SHA1':
			case 'SHA256':
			case 'SHA512':
				return key.toLowerCase()
		}
	}
}
