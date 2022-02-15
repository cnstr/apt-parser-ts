import { readFile } from 'node:fs/promises'
import { BinaryControl } from '.'

test('control:clang', async () => {
	const data = await readFile('test/clang.control', 'utf8')
	const control = new BinaryControl(data)

	expect(control.package).toEqual('clang')
	expect(control.source).toEqual('llvm-defaults (0.54)')
	expect(control.version).toEqual('1:13.0-54')
	expect(control.architecture).toEqual('amd64')
	expect(control.installedSize).toEqual(24)
	expect(control.section).toEqual('devel')
	expect(control.priority).toEqual('optional')

	expect(control.maintainer).toEqual('Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>')
	expect(control.get('Original-Maintainer')).toEqual('LLVM Packaging Team <pkg-llvm-team@lists.alioth.debian.org>')

	expect(control.depends).toEqual(expect.arrayContaining([
		'clang-13 (>= 13~)'
	]))

	expect(control.breaks).toEqual(expect.arrayContaining([
		'clang-3.2',
		'clang-3.3',
		'clang-3.4 (<< 1:3.4.2-7~exp1)',
		'clang-3.5 (<< 1:3.5~+rc1-3~exp1)'
	]))

	expect(control.replaces).toEqual(expect.arrayContaining([
		'clang (<< 3.2-1~exp2)',
		'clang-3.2',
		'clang-3.3',
		'clang-3.4 (<< 1:3.4.2-7~exp1)',
		'clang-3.5 (<< 1:3.5~+rc1-3~exp1)'
	]))

	expect(control.description).toEqual('C, C++ and Objective-C compiler (LLVM based), clang binary Clang project is a C, C++, Objective C and Objective C++ front-end for the LLVM compiler. Its goal is to offer a replacement to the GNU Compiler Collection (GCC). Clang implements all of the ISO C++ 1998, 11 and 14 standards and also provides most of the support of C++17. This is a dependency package providing the default clang compiler.')
})

test('control:com.amywhile.signalreborn', async () => {
	const data = await readFile('test/com.amywhile.signalreborn.control', 'utf8')
	const control = new BinaryControl(data)

	expect(control.package).toEqual('com.amywhile.signalreborn')
	expect(control.architecture).toEqual('iphoneos-arm')
	expect(control.description).toEqual('Visualise your nearby cell towers')
	expect(control.depends).toEqual(expect.arrayContaining([
		'firmware (>= 12.2) | org.swift.libswift'
	]))

	expect(control.conflicts).toEqual(expect.arrayContaining([
		'com.charliewhile.signalreborn'
	]))

	expect(control.replaces).toEqual(expect.arrayContaining([
		'com.charliewhile.signalreborn'
	]))

	expect(control.breaks).toEqual(expect.arrayContaining([
		'com.charliewhile.signalreborn'
	]))

	expect(control.maintainer).toEqual('Amy While <support@anamy.gay>')
	expect(control.section).toEqual('Applications')
	expect(control.version).toEqual('2.2.1-2')
	expect(control.installedSize).toEqual(1536)

	expect(control.get('Name')).toEqual('SignalReborn')
	expect(control.get('Author')).toEqual('Amy While <support@anamy.gay>')
	expect(control.get('Tag')).toEqual('compatible_min::ios11.0')
	expect(control.get('Icon')).toEqual('https://img.chariz.cloud/icon/signal/icon@3x.png')
	expect(control.get('Depiction')).toEqual('https://chariz.com/get/signal')
})
