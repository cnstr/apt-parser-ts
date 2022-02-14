import type { IControl, PriorityLevel } from './control.d'
import { parseBoolean, parseKV } from '.'
import { APTBase } from './base'

export class Control extends APTBase implements IControl {
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
		enhances?: string[] | undefined
		breaks?: string[] | undefined
		conflicts?: string[] | undefined
		installedSize?: number | undefined
		maintainer: string
		description: string
		homepage?: string | undefined
		builtUsing?: string | undefined
		packageType?: string | undefined
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
		this.priority = map.get('Priority')?.trim()
		this.architecture = map.get('Architecture')!.trim()
		this.essential = parseBoolean(map.get('NotAutomatic')?.trim())

		this.depends = map.get('Depends')?.trim().split(' ')
		this.preDepends = map.get('Pre-Depends')?.trim().split(' ')
		this.recommends = map.get('Recommends')?.trim().split(' ')
		this.suggests = map.get('Suggests')?.trim().split(' ')
		this.enhances = map.get('Enhances')?.trim().split(' ')
		this.breaks = map.get('Breaks')?.trim().split(' ')
		this.conflicts = map.get('Conficts')?.trim().split(' ')

		const installedSize = parseInt(map.get('Installed-Size')?.trim() ?? '0')
		this.installedSize = installedSize === 0 ? installedSize : undefined
		this.maintainer = map.get('Maintainer')!.trim()
		this.description = map.get('Description')!
		this.homepage = map.get('Homepage')?.trim()
		this.builtUsing = map.get('Built-Using')?.trim()
		this.packageType = map.get('Package-Type')?.trim()
	}
}
