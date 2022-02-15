import { BinaryControl } from '.'
import type { IPackage } from './packages.d'

/**
 * Class representing a single package in a packages file
 *
 * For keys that are documented by Debian, we can do some strict type inference.
 * See: https://wiki.debian.org/DebianRepository/Format#A.22Packages.22_Indices
 *
 * To meet the needs of many people, `apt-parser` will handle documented keys both ways.
 * It will populate the strictly typed fields and also leave the raw-string value and key.
 */
class Package extends BinaryControl implements IPackage {
	// Begin Raw Implementation
	filename: string
	size: number
	md5?: string | undefined
	sha1?: string | undefined
	sha256?: string | undefined
	sha512?: string | undefined
	descriptionMd5?: string | undefined
	// End Raw Implementation

	/**
	 * Create a type-safe Control object and populate its keys
	 * @param {string} rawData Contents of a control file from a debian binary
	 */
	constructor(rawData: string) {
		super(rawData)

		this.filename = this.raw.get('Filename')!.trim()
		this.size = parseFloat(this.raw.get('Size')!.trim())

		this.md5 = this.raw.get('MD5sum')?.trim()
		this.sha1 = this.raw.get('SHA1')?.trim()
		this.sha256 = this.raw.get('SHA256')?.trim()
		this.sha512 = this.raw.get('SHA512')?.trim()
		this.descriptionMd5 = this.raw.get('Description-md5')?.trim()
	}
}

/**
 * Class representing a packages file
 *
 * For keys that are documented by Debian, we can do some strict type inference.
 * See: https://wiki.debian.org/DebianRepository/Format#A.22Packages.22_Indices
 *
 * To meet the needs of many people, `apt-parser` will handle documented keys both ways.
 * It will populate the strictly typed fields and also leave the raw-string value and key.
 */
export class Packages extends Array<Package> {
	constructor(rawData: string) {
		const cleanedData = rawData.replaceAll(/\r\n|\r|\n/g, '\n').replaceAll(/\0/g, '').normalize().trim()
		const packageChunks = cleanedData.split('\n\n') // We know it will always be \n\n because of our cleanup
		super(...packageChunks.map(chunk => new Package(chunk)))
	}
}
