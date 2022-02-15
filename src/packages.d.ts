import type { IControl } from './control.d'

interface IPackage extends IControl {
	filename: string // Filename
	size: number // Size
	md5?: string // MD5Sum
	sha1?: string // SHA1
	sha256?: string // SHA256
	sha512?: string // SHA512
	descriptionMd5?: string // Description-md5
}
