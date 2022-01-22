import { parseKV } from '.'

type ReleaseHash = {
	filename: string
	hash: string
	size: number
}

/**
 * Class representing a release file
 *
 * For keys that are documented by Debian, we can do some strict type inference.
 * See: https://wiki.debian.org/DebianRepository/Format#A.22Release.22_files
 *
 * To meet the needs of many people, `apt-parser` will handle documented keys both ways.
 * It will populate the strictly typed fields and also leave the raw-string value and key.
 */
export class Release {
	/**
	 * Raw key-value map of Release fields
	 */
	raw: Map<string, string>

	/**
	 * Parsed array of strings depicting the supported architectures.
	 *
	 * Represents the `Architectures` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Architectures
	 */
	architectures: string[]

	/**
	 * Optional boolean value depicting the support for the `all` value in `Architectures`.
	 *
	 * Represents the `No-Support-For-Architecture-All` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#No-Support-for-Architecture-all
	 */
	noSupportForArchitectureAll?: boolean

	/**
	 * Optional string depicting a possible multi-line description set by the repository.
	 *
	 * Represents the `Description` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format
	 */
	description?: string

	/**
	 * Optional string depicting a single line of free-form text set by the repository.
	 *
	 * Represents the `Origin` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Origin
	 */
	origin?: string

	/**
	 * Optional string depicting a single line of free-form text set by the repository.
	 *
	 * Represents the `Label` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Label
	 */
	label?: string

	/**
	 * Required string value that desrcibes the suite on distribution repositories.
	 *
	 * Represents the `Suite` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Suite
	 */
	suite: string

	/**
	 * Codename identifier specified in the repository release.
	 *
	 * Represents the `Codename` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Codename
	 */
	codename: string

	/**
	 * Version string set by the repository.
	 *
	 * Represents the `Version` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Version
	 */
	version?: string // TODO: DebianVersion type

	/**
	 * Parsed date string from the repository.
	 *
	 * Represents the `Date` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Date.2C_Valid-Until
	 */
	date?: Date

	/**
	 * Parsed date till valid string from the repository.
	 *
	 * Represents the `Valid-Until` key on Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Date.2C_Valid-Until
	 */
	validUntil?: Date

	/**
	 * Parsed array of strings depicting the available components.
	 *
	 * Represents the `Components` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Components
	 */
	components: string[]

	/**
	 * Optional list of MD5 file hashes.
	 *
	 * Represents the `MD5Sum` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#MD5Sum.2C_SHA1.2C_SHA256
	 */
	md5?: ReleaseHash[]

	/**
	 * Optional list of SHA1 file hashes.
	 *
	 * Represents the `SHA1` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#MD5Sum.2C_SHA1.2C_SHA256
	 */
	sha1?: ReleaseHash[]

	/**
	 * Optional list of SHA256 file hashes.
	 *
	 * Represents the `SHA256` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#MD5Sum.2C_SHA1.2C_SHA256
	 */
	sha256?: ReleaseHash[]

	/**
	 * Optional list of SHA512 file hashes.
	 *
	 * Represents the `SHA512` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#MD5Sum.2C_SHA1.2C_SHA256
	 */
	sha512?: ReleaseHash[]


	/**
	 * Optional boolean value that tells if the client should automatically upgrade.
	 *
	 * Represents the `NotAutomatic` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#NotAutomatic_and_ButAutomaticUpgrades
	 */
	notAutomatic?: boolean

	/**
	 * Optional boolean value that pins upgrades on newer package versions.
	 *
	 * Represents the `ButAutomaticUpgrades` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#NotAutomatic_and_ButAutomaticUpgrades
	 */
	butAutomaticUpgrades?: boolean

	/**
	 * An optional boolean value that indicates the server supports the 'by-hash' locations.
	 *
	 * Represents the `Acquire-By-Hash` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Acquire-By-Hash
	 */
	acquireByHash?: boolean

	/**
	 * Optional field containing a list of OpenGPG fingerprints that have signed the Release.
	 *
	 * Represents the `Signed-By` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Signed-By
	 */
	signedBy?: string[]

	/**
	 * Optional boolean value that indicates if package downloads require authorization.
	 *
	 * Represents the `Packages-Require-Authorization` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Packages-Require-Authorization
	 */
	packagesRequireAuthorization?: boolean

	/**
	 * Create a type-safe Release object and populate its keys
	 * @param {string} rawData Contents of a Release file from an APT repository
	 */
	constructor(rawData: string) {
		const map = parseKV(rawData)
		this.raw = map

		this.architectures = map.get('Architectures')!.trim().split(' ')
		this.noSupportForArchitectureAll = this.parseBoolean(map.get('No-Support-For-Architecture-All')?.trim())

		this.description = map.get('Description')?.trim()
		this.origin = map.get('Origin')?.trim()
		this.label = map.get('Label')?.trim()
		this.suite = map.get('Suite')!.trim()
		this.codename = map.get('Codename')!.trim()
		this.version = map.get('Version')?.trim()
		this.date = map.get('Date') ? new Date(map.get('Date')!) : undefined
		this.validUntil = map.get('Valid-Until') ? new Date(map.get('Valid-Until')!) : undefined
		this.components = map.get('Components')!.trim().split(' ')

		this.notAutomatic = this.parseBoolean(map.get('NotAutomatic')?.trim())
		this.butAutomaticUpgrades = this.parseBoolean(map.get('ButAutomaticUpgrades')?.trim())
		this.acquireByHash = this.parseBoolean(map.get('Acquire-By-Hash')?.trim())
		this.signedBy = map.get('Signed-By')?.split(',')
		this.packagesRequireAuthorization = this.parseBoolean(map.get('Packages-Require-Authorization')?.trim())

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
	 * @returns {string} Class property name
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

	/**
	 * Parses the APT format for a boolean
	 * @param {string?} value Optional value of yes/no
	 * @returns {boolean?} true/false or undefined if the supplied value is undefined
	 */
	private parseBoolean(value?: string): boolean | undefined {
		if (value === 'yes') {
			return true
		}

		if (value === 'no') {
			return false
		}
	}
}
