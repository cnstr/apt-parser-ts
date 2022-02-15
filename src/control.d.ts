export type PriorityLevel = 'required' | 'important' | 'standard' | 'optional' | 'extra'
export type PackageType = 'deb' | 'udeb'

// TODO: ^([^<(]+?)?[ \t]*(?:<([^>(]+?)>)?[ \t]*(?:\(([^)]+?)\)|$)
export interface MaintainerField {
	name: string
	email?: string
	website?: string
}

export interface IControl {
	package: string               // => Package
	source?: string               // => Source
	version: string               // => Version
	section?: string              // => Section
	priority?: PriorityLevel      // => Priority
	architecture: string          // => Architecture
	essential?: boolean           // => Essential

	depends?: string[]            // => Depends
	preDepends?: string[]         // => Pre-Depends
	recommends?: string[]         // => Recommends
	suggests?: string[]           // => Suggests
	replaces?: string[]           // => Replaces
	enhances?: string[]           // => Enhances
	breaks?: string[]             // => Breaks
	conflicts?: string[]          // => Conflicts

	installedSize?: number         // => Installed-Size
	maintainer: string            // => Maintainer
	description: string           // => Description
	homepage?: string             // => Homepage
	builtUsing?: string           // => Built-Using
	packageType?: PackageType     // => Package-Type
}
