import { parseBoolean, parseKV } from '.'
import { APTBase } from './base'

export type PriorityLevel = 'required' | 'important' | 'standard' | 'optional' | 'extra'
export type PackageType = 'deb' | 'udeb'

// TODO: ^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)
export interface MaintainerField {
	name: string
	email?: string
	website?: string
}

export interface IBinaryControl {
	/**
	 * A string depicting the name of the package.
	 *
	 * Represents the `Package` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package
	 */
	package: string

	/**
	 * An optional string depicting the name of a source package.
	 *
	 * Represents the `Source` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#source
	 */
	source?: string

	/**
	 * A string depicting the version of a package.
	 *
	 * Represents the `Version` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#version
	 */
	version: string

	/**
	 * An optional string depicting the section that a package belongs to.
	 *
	 * Represents the `Section` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#section
	 */
	section?: string

	/**
	 * An optional string depicting a package's priority.
	 *
	 * Represents the `Priority` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#priority
	 */
	priority?: PriorityLevel

	/**
	 * A string representing the package's target architecture.
	 *
	 * Represents the `Architecture` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#architecture
	 */
	architecture: string

	/**
	 * An optional boolean that marks a package as essential or not.
	 *
	 * Represents the `Essential` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#essential
	 */
	essential?: boolean

	/**
	 * An optional array that represents a package's dependencies.
	 *
	 * Represents the `Depends` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	depends?: string[]

	/**
	 * An optional array that represents a package's predependencies.
	 *
	 * Represents the `Pre-Depends` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	preDepends?: string[]

	/**
	 * An optional array that represents packages recommended with the target package.
	 *
	 * Represents the `Recommends` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	recommends?: string[]

	/**
	 * An optional array that represents packages suggested with the target package.
	 *
	 * Represents the `Suggests` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	suggests?: string[]

	/**
	 * An optional array that represents packages that the target package replaces.
	 *
	 * Represents the `Replaces` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	replaces?: string[]

	/**
	 * An optional array that represents packages that the target package enhances.
	 *
	 * Represents the `Enhances` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	enhances?: string[]

	/**
	 * An optional array that represents packages that the target package breaks.
	 *
	 * Represents the `Breaks` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	breaks?: string[]

	/**
	 * An optional array that represents packages that conflict with the target package.
	 *
	 * Represents the `Conflicts` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#package-interrelationship-fields-depends-pre-depends-recommends-suggests-breaks-conflicts-provides-replaces-enhances
	 */
	conflicts?: string[]

	/**
	 * An optional number representing the size of the package when installed.
	 *
	 * Represents the `Installed-Size` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#installed-size
	 */
	installedSize?: number

	/**
	 * A string representing the package maintainer.
	 *
	 * Represents the `Maintainer` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#maintainer
	 */
	maintainer: string

	/**
	 * A string representing the package description.
	 *
	 * Represents the `Description` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#description
	 */
	description: string

	/**
	 * An optional string representing the package's homepage URL.
	 *
	 * Represents the `Homepage` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#homepage
	 */
	homepage?: string

	/**
	 * An optional string representing the system which built the package.
	 *
	 * Represents the `Built-Using` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-relationships.html#s-built-using
	 */
	builtUsing?: string

	/**
	 * An optional string representing the package's type.
	 *
	 * Represents the `Package-Type` key on the control contents.
	 *
	 * For the technical specification, see:
	 * https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-package-type
	 */
	packageType?: PackageType
}

/**
 * Class representing a binary control file
 *
 * For keys that are documented by Debian, we can do some strict type inference.
 * See: https://www.debian.org/doc/debian-policy/ch-controlfields.html
 *
 * To meet the needs of many people, `apt-parser` will handle documented keys both ways.
 * It will populate the strictly typed fields and also leave the raw-string value and key.
 */
export class BinaryControl extends APTBase implements IBinaryControl {
	// Begin Raw Implementation
		package: string
		source?: string | undefined
		version: string
		section?: string | undefined
		priority?: PriorityLevel | undefined
		architecture: string
		essential?: boolean | undefined
		depends?: string[] | undefined
		preDepends?: string[] | undefined
		recommends?: string[] | undefined
		suggests?: string[] | undefined
		replaces?: string[] | undefined
		enhances?: string[] | undefined
		breaks?: string[] | undefined
		conflicts?: string[] | undefined
		installedSize?: number | undefined
		maintainer: string
		description: string
		homepage?: string | undefined
		builtUsing?: string | undefined
		packageType?: PackageType | undefined
	// End Raw Implementation

	/**
	 * Create a type-safe Control object and populate its keys
	 * @param {string} rawData Contents of a control file from a debian binary
	 */
	 constructor(rawData: string) {
		super()

		const map = parseKV(rawData)
		this.raw = map

		this.package = map.get('Package')!.trim()
		this.source = map.get('Source')?.trim()
		this.version = map.get('Version')!.trim()
		this.section = map.get('Section')?.trim()
		this.priority = map.get('Priority')?.trim() as PriorityLevel
		this.architecture = map.get('Architecture')!.trim()
		this.essential = parseBoolean(map.get('NotAutomatic')?.trim())

		this.depends = map.get('Depends')?.trim().split(', ')
		this.preDepends = map.get('Pre-Depends')?.trim().split(', ')
		this.recommends = map.get('Recommends')?.trim().split(', ')
		this.suggests = map.get('Suggests')?.trim().split(', ')
		this.replaces = map.get('Replaces')?.trim().split(', ')
		this.enhances = map.get('Enhances')?.trim().split(', ')
		this.breaks = map.get('Breaks')?.trim().split(', ')
		this.conflicts = map.get('Conflicts')?.trim().split(', ')

		const installedSize = parseInt(map.get('Installed-Size')?.trim() ?? '0')
		this.installedSize = installedSize !== 0 ? installedSize : undefined
		this.maintainer = map.get('Maintainer')!.trim()
		this.description = map.get('Description')!
		this.homepage = map.get('Homepage')?.trim()
		this.builtUsing = map.get('Built-Using')?.trim()
		this.packageType = map.get('Package-Type')?.trim() as PackageType
	}
}
