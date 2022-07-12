import { readFile } from 'node:fs/promises'
import { parsePackages, parseRelease } from '../src'
import { test, expect } from 'vitest'

test('deprecated:release:chariz', async () => {
	const data = await readFile('test/files/chariz.release', 'utf8')
	const map = parseRelease(data)
	expect(map).toBeDefined()
})

test('deprecated:release:jammy', async () => {
	const data = await readFile('test/files/jammy.release', 'utf8')
	const map = parseRelease(data)
	expect(map).toBeDefined()
})

test('deprecated:packages:chariz', async () => {
	const data = await readFile('test/files/chariz.packages', 'utf8')
	const map = parsePackages(data)
	expect(map.length).toBe(415)
})

test('deprecated:packages:jammy', async () => {
	const data = await readFile('test/files/jammy.packages', 'utf8')
	const map = parsePackages(data)
	expect(map.length).toBe(6132)
})
