# APT Parser

This library is capable of parsing files used within the [APT Package Manager](https://en.wikipedia.org/wiki/APT_(software)).<br>
A typical APT repository advertises a release file and packages file, both of which use a key-value organization system to declare information. This library is able to parse the data and return it as type-safe objects for usage in JavaScript and TypeScript projects.<br>

### Installation
`npm install --save apt-parser`<br>

### Release Parsing
Here's an example for getting the information out of a Release file:<br>
```ts
import axios from 'axios';
import { Release } from 'apt-parser';

const { data } = await axios.get('http://archive.ubuntu.com/ubuntu/dists/jammy/Release');
const release = new Release(data);

console.log(release.origin); // => Ubuntu
console.log(release.version); // => 22.04
console.log(release.get('InvalidKey')); // => null
```

A full Release object has the following properties attached on it, all of which map to documented APT fields.<br>
For more information on the Debian Repository Format, see https://wiki.debian.org/DebianRepository/Format.<br>

```ts
interface Release {
	architectures: string[]               // => Architectures
	noSupportForArchitectureAll?: boolean // => No-Support-For-Architecture-All
	description?: string                  // => Description
	origin?: string                       // => Origin
	label?: string                        // => Label
	suite: string                         // => Suite
	codename: string                      // => Codename
	version?: string                      // => Version
	date?: Date                           // => Date
	validUntil?: Date                     // => Valid-Until
	components: string[]                  // => Components
	md5?: ReleaseHash[]                   // => MD5Sum
	sha1?: ReleaseHash[]                  // => SHA1
	sha256?: ReleaseHash[]                // => SHA256
	sha512?: ReleaseHash[]                // => SHA512
	notAutomatic?: boolean                // => NotAutomatic
	butAutomaticUpgrades?: boolean        // => ButAutomaticUpgrades
	acquireByHash?: boolean               // => Acquire-By-Hash
	signedBy?: string[]                   // => Signed-By
	packagesRequireAuthorization: boolean // => Packages-Require-Authorization

	get(key: string): string | undefined  // => Retrieve a raw field value not assigned a strict type
	get fieldCount(): number              // => Get total number of fields in the Release contents
}

type ReleaseHash = {
	filename: string
	hash: string
	size: number
}
```

### Packages Parsing
*Package parsing will have strictly defined types soon*<br>
Here's an example for getting the information out of a Packages file:<br>
```ts
import axios from 'axios';
import { parsePackages } from 'apt-parser';

const { data } = await axios.get('https://repo.chariz.com/Packages');
const packages = parsePackages(data);

for (const packageMap of packages) {
	console.log(packageMap.get('Package')); // Package Identifier
	console.log(packageMap.get('InvalidKey')); // => null
}
```
