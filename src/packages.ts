import { BinaryControl, IBinaryControl } from '.'
import { ParserOptions } from './base'

export interface IPackage extends IBinaryControl {
	/**
	 * A string depicting the file location of the package.
	 *
	 * Represents the `Filename` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Filename
	 */
	filename: string


	/**
	 * A number depicting the size of the package.
	 *
	 * Represents the `Size` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Size.2C_MD5sum.2C_SHA1.2C_SHA256.2C_SHA512
	 */
	size: number

	/**
	 * Optional list of MD5 file hashes.
	 *
	 * Represents the `MD5sum` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Size.2C_MD5sum.2C_SHA1.2C_SHA256.2C_SHA512
	 */
	md5?: string

	/**
	 * Optional list of SHA1 file hashes.
	 *
	 * Represents the `SHA1` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Size.2C_MD5sum.2C_SHA1.2C_SHA256.2C_SHA512
	 */
	sha1?: string

	/**
	 * Optional list of SHA256 file hashes.
	 *
	 * Represents the `SHA256` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Size.2C_MD5sum.2C_SHA1.2C_SHA256.2C_SHA512
	 */
	sha256?: string

	/**
	 * Optional list of SHA512 file hashes.
	 *
	 * Represents the `SHA512` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Size.2C_MD5sum.2C_SHA1.2C_SHA256.2C_SHA512
	 */
	sha512?: string

	/**
	 * An optional string containing the hash of the full english description.
	 *
	 * Represents the `Description-md5` key on the Release contents.
	 *
	 * For the technical specification, see:
	 * https://wiki.debian.org/DebianRepository/Format#Description-md5
	 */
	descriptionMd5?: string
}

/**
 * Class representing a single package in a packages file
 *
 * For keys that are documented by Debian, we can do some strict type inference.
 * See: https://wiki.debian.org/DebianRepository/Format#A.22Packages.22_Indices
 *
 * To meet the needs of many people, `apt-parser` will handle documented keys both ways.
 * It will populate the strictly typed fields and also leave the raw-string value and key.
 */
export class Package extends BinaryControl implements IPackage {
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
	 * @param {ParserOptions} options Optional object for modifying options when constructing
	 */
	constructor(rawData: string, options?: ParserOptions) {
		super(rawData, options)
		super.required = options?.skipValidation ? [] : [
			'Filename',
			'Size'
		]

		this.filename = this.raw.get('Filename')?.trim() ?? ''
		this.size = parseFloat(this.raw.get('Size')?.trim() ?? '0')

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
	constructor(args: string, options?: ParserOptions) {
		if (typeof args === 'string') {
			const cleanedData = args.replaceAll(/\r\n|\r|\n/g, '\n').replaceAll(/\0/g, '').normalize().trim()
			const packageChunks = cleanedData.split('\n\n') // We know it will always be \n\n because of our cleanup

			const cleanedArray = packageChunks.map(chunk => {
				if (chunk.trim().length > 0) {
					return new Package(chunk, options)
				}
			}).filter(item => item) as Package[]
			super(...cleanedArray)
		} else {
			// Arrays have multiple constructor handlers
			// Let's not break the default behavior
			const passer = args as any
			super(passer)
		}
	}
}
