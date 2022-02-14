export type ReleaseHash = {
	/**
	 * Name of the file that has been hashed
	 */
	filename: string

	/**
	 * Hash-sum value representing the hashing algorithm
	 */
	hash: string

	/**
	 * File-size value
	 */
	size: number
}

export interface IRelease {
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
	 suite: string | undefined

	 /**
	  * Codename identifier specified in the repository release.
	  *
	  * Represents the `Codename` key on Release contents.
	  *
	  * For the technical specification, see:
	  * https://wiki.debian.org/DebianRepository/Format#Codename
	  */
	 codename: string | undefined

	 /**
	  * Version string set by the repository.
	  *
	  * Represents the `Version` key on Release contents.
	  *
	  * For the technical specification, see:
	  * https://wiki.debian.org/DebianRepository/Format#Version
	  */
	 version?: string

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
}
