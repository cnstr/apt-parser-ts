import { readFile } from 'node:fs/promises'
import { Packages } from '.'

test('chariz:packages', async () => {
	const data = await readFile('test/chariz.packages', 'utf8')
	const packages = new Packages(data)
	const pkg = packages[0]

	expect(packages.length).toEqual(415)

	expect(pkg.package).toEqual('arpoison')
	expect(pkg.architecture).toEqual('iphoneos-arm')
	expect(pkg.description).toEqual('Generates user-defined ARP packets')
	expect(pkg.maintainer).toEqual('MidnightChips <midnightchips@gmail.com>')
	expect(pkg.version).toEqual('0.7')
	expect(pkg.section).toEqual('System')
	expect(pkg.homepage).toEqual('http://www.arpoison.net/')
	expect(pkg.depends).toEqual(expect.arrayContaining([
		'libnet9'
	]))

	expect(pkg.filename).toEqual('debs/arpoison_0.7_iphoneos-arm.deb')
	expect(pkg.size).toEqual(9618)
	expect(pkg.installedSize).toEqual(88)
	expect(pkg.sha256).toEqual('9f9f615c50e917e0ce629966899ed28ba78fa637c5de5476aac34f630ab18dd5')
	expect(pkg.md5).toEqual('e0be09b9f6d1c17371701d0ed6f625bf')

	expect(pkg.get('Author')).toEqual('MidnightChips <midnightchips@gmail.com>')
	expect(pkg.get('Depiction')).toEqual('https://chariz.com/get/arpoison')
	expect(pkg.get('SileoDepiction')).toEqual('https://repo.chariz.com/api/sileo/package/arpoison/depiction.json')
	expect(pkg.get('Tag')).toEqual('role::developer, compatible_min::ios14.0')
})

test('jammy:packages', async () => {
	const data = await readFile('test/jammy.packages', 'utf8')
	const packages = new Packages(data)
	const pkg = packages[0]

	expect(packages.length).toEqual(6132)

	expect(pkg.package).toEqual('accountsservice')
	expect(pkg.architecture).toEqual('amd64')
	expect(pkg.version).toEqual('0.6.55-3ubuntu2')
	expect(pkg.priority).toEqual('optional')
	expect(pkg.section).toEqual('gnome')
	expect(pkg.maintainer).toEqual('Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>')
	expect(pkg.installedSize).toEqual(484)
	expect(pkg.depends).toEqual(expect.arrayContaining([
		'dbus (>= 1.9.18)',
		'libaccountsservice0 (= 0.6.55-3ubuntu2)',
		'libc6 (>= 2.34)',
		'libglib2.0-0 (>= 2.44)',
		'libpolkit-gobject-1-0 (>= 0.99)'
	]))

	expect(pkg.recommends).toEqual(expect.arrayContaining([
		'default-logind | logind'
	]))

	expect(pkg.suggests).toEqual(expect.arrayContaining([
		'gnome-control-center'
	]))

	expect(pkg.filename).toEqual('pool/main/a/accountsservice/accountsservice_0.6.55-3ubuntu2_amd64.deb')
	expect(pkg.size).toEqual(66304)
	expect(pkg.md5).toEqual('d1dc884f3b039c09d9aaa317d6614582')
	expect(pkg.sha1).toEqual('f0c2c870146d05b8d53cd805527e942ca793ce38')
	expect(pkg.sha256).toEqual('9823e2e330e3ca986440eb5117574c29c1247efc4e8e23cd3b936013dff493b1')
	expect(pkg.sha512).toEqual('9d816378feaa1cb1135212b416321059b86ee622eccfd3e395b863e5b2ea976244c2b2c016b44f5bf6a30f18cd04406c0193f0da13ca296aac0212975f763bd7')
	expect(pkg.description).toEqual('query and manipulate user account information')
	expect(pkg.descriptionMd5).toEqual('8aeed0a03c7cd494f0c4b8d977483d7e')

	expect(pkg.get('Origin')).toEqual('Ubuntu')
	expect(pkg.get('Original-Maintainer')).toEqual('Debian freedesktop.org maintainers <pkg-freedesktop-maintainers@lists.alioth.debian.org>')
	expect(pkg.get('Bugs')).toEqual('https://bugs.launchpad.net/ubuntu/+filebug')
	expect(pkg.get('Homepage')).toEqual('https://www.freedesktop.org/wiki/Software/AccountsService/')
	expect(pkg.get('Task')).toEqual('ubuntu-desktop-minimal, ubuntu-desktop, ubuntu-desktop-raspi, kubuntu-desktop, xubuntu-core, xubuntu-desktop, lubuntu-desktop, ubuntustudio-desktop-core, ubuntustudio-desktop, ubuntukylin-desktop, ubuntu-mate-core, ubuntu-mate-desktop, ubuntu-budgie-desktop, ubuntu-budgie-desktop-raspi')
})
