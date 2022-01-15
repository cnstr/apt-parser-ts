import { readFile } from 'node:fs/promises'
import { packages, release } from '.'

test('release:chariz', async () => {
	const data = await readFile('test/chariz.release', 'utf8')
	const map = release(data)
	expect(map).toBeDefined()
})

test('release:jammy', async () => {
	const data = await readFile('test/jammy.release', 'utf8')
	const map = release(data)
	expect(map).toBeDefined()
})

test('packages:chariz', async () => {
	const data = await readFile('test/chariz.packages', 'utf8')
	const map = packages(data)
	expect(map.length).toBe(415)
})

test('packages:jammy', async () => {
	const data = await readFile('test/jammy.packages', 'utf8')
	const map = packages(data)
	console.log(map.length)
	expect(map.length).toBe(6132)
})
