import type { IControl } from './control.d'

interface IPackage extends IControl {
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
	 * Represents the `MD5Sum` key on the Release contents.
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
