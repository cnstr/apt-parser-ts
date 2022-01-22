import { readFile } from 'node:fs/promises'
import { Release } from '.'


test('release:chariz', async () => {
	const data = await readFile('test/chariz.release', 'utf8')
	const release = new Release(data)

	expect(release.fieldCount).toEqual(11)
	expect(release.architectures).toEqual(expect.arrayContaining(['iphoneos-arm']))
	expect(release.noSupportForArchitectureAll).toBeUndefined()
	expect(release.description).toEqual('Check out what’s new and download purchases from the Chariz marketplace!')

	expect(release.origin).toEqual('Chariz')
	expect(release.label).toEqual('Chariz')
	expect(release.suite).toEqual('stable')
	expect(release.codename).toEqual('hbang')
	expect(release.version).toEqual('0.9')
	expect(release.date).toEqual(new Date('Thu, 13 Jan 2022 07:15:42 +0000'))
	expect(release.validUntil).toBeUndefined()
	expect(release.components).toEqual(expect.arrayContaining(['main']))

	expect(release.md5?.length).toEqual(5)
	expect(release.sha1).toBeUndefined()
	expect(release.sha256).toBeUndefined()
	expect(release.sha512?.length).toEqual(5)

	expect(release.notAutomatic).toBeUndefined()
	expect(release.butAutomaticUpgrades).toBeUndefined()
	expect(release.acquireByHash).toBeUndefined()
	expect(release.signedBy).toBeUndefined()
	expect(release.packagesRequireAuthorization).toBeUndefined()
})

test('release:jammy', async () => {
	const data = await readFile('test/jammy.release', 'utf8')
	const release = new Release(data)

	expect(release.fieldCount).toEqual(13)
	expect(release.architectures).toEqual(expect.arrayContaining([
		'amd64',
		'arm64',
		'armhf',
		'i386',
		'ppc64el',
		'riscv64',
		's390x'
	]))

	expect(release.noSupportForArchitectureAll).toBeUndefined()
	expect(release.description).toEqual('Ubuntu Jammy 22.04')

	expect(release.origin).toEqual('Ubuntu')
	expect(release.label).toEqual('Ubuntu')
	expect(release.suite).toEqual('jammy')
	expect(release.codename).toEqual('jammy')
	expect(release.version).toEqual('22.04')
	expect(release.date).toEqual(new Date('Sat, 15 Jan 2022 22:01:06 UTC'))
	expect(release.validUntil).toBeUndefined()
	expect(release.components).toEqual(expect.arrayContaining([
		'main',
		'restricted',
		'universe',
		'multiverse'
	]))

	expect(release.md5?.length).toEqual(919)
	expect(release.sha1?.length).toEqual(919)
	expect(release.sha256?.length).toEqual(919)
	expect(release.sha512).toBeUndefined()

	expect(release.notAutomatic).toBeUndefined()
	expect(release.butAutomaticUpgrades).toBeUndefined()
	expect(release.acquireByHash).toEqual(true)
	expect(release.signedBy).toBeUndefined()
	expect(release.packagesRequireAuthorization).toBeUndefined()
})
