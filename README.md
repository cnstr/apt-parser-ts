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
interface IRelease {
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

### Binary Control Parsing
Here's an example for getting the information out of a binary control file:<br>
```ts
import { Release } from 'apt-parser';

const data =
`
Package: com.amywhile.signalreborn
Architecture: iphoneos-arm
Description: Visualise your nearby cell towers
Depends: firmware (>= 12.2) | org.swift.libswift
Maintainer: Amy While <support@anamy.gay>
Section: Applications
Version: 2.2.1-2
Installed-Size: 1536
Custom-Key: cool-value
`;

const control = new BinaryControl(data);

console.log(control.version); // => 2.2.1-2
console.log(control.package); // => com.amywhile.signalreborn
console.log(control.get('Custom-Key')); // => cool-value
console.log(control.get('Invalid-Key')); // => null
```

A full BinaryControl object has the following properties attached on it, all of which map to documented APT fields.<br>
For more information on the Debian Control Format, see https://www.debian.org/doc/debian-policy/ch-controlfields.html.<br>

```ts
interface IBinaryControl {
	package: string                       // => Package
	source?: string                       // => Source
	version: string                       // => Version
	section?: string                      // => Section
	priority?: PriorityLevel              // => Priority
	architecture: string                  // => Architecture
	essential?: boolean                   // => Essential

	depends?: string[]                    // => Depends
	preDepends?: string[]                 // => Pre-Depends
	recommends?: string[]                 // => Recommends
	suggests?: string[]                   // => Suggests
	replaces?: string[]                   // => Replaces
	enhances?: string[]                   // => Enhances
	breaks?: string[]                     // => Breaks
	conflicts?: string[]                  // => Conflicts

	installedSize?: number               // => Installed-Size
	maintainer: string                    // => Maintainer
	description: string                   // => Description
	homepage?: string                     // => Homepage
	builtUsing?: string                   // => Built-Using
	packageType?: PackageType             // => Package-Type

	get(key: string): string | undefined  // => Retrieve a raw field value not assigned a strict type
	get fieldCount(): number              // => Get total number of fields in the control contents
}
```

### Packages Parsing
Here's an example for getting the information out of a Packages file:<br>
```ts
import axios from 'axios';
import { Packages } from 'apt-parser';

const { data } = await axios.get('https://repo.chariz.com/Packages');
const packages = new Packages(data);

for (const pkg of packages) {
	console.log(pkg.package); // Package Identifier
	console.log(pkg.get('InvalidKey')); // => null
}
```

A full Packages object has the following properties attached on it, all of which map to documented APT fields.<br>
For more information on the Debian Repository Format, see https://wiki.debian.org/DebianRepository/Format.<br>

```ts
interface IPackage extends IBinaryControl {
	filename: string                      // => Filename
	size: number                          // => Size
	md5?: string                          // => MD5sum
	sha1?: string                         // => SHA1
	sha256?: string                       // => SHA256
	sha512?: string                       // => SHA512
	descriptionMd5?: string               // => Description-md5

	get(key: string): string | undefined  // => Retrieve a raw field value not assigned a strict type
	get fieldCount(): number              // => Get total number of fields in the package contents
}

interface IPackages extends Array<IPackage> {
	constructor(rawData: string) // Pass in the raw contents of the file
}
```

### Skipping Validation
The parser validates required fields based on the parameters defined by the Debian Team on their documentation pages. Disabling this validation is possible, but it is not recommended if you are parsing valid repositories.

Disabling this validation will stop the APT parser from throwing any `MissingRequiredKeyError`s. It is disabled through an option when constructing your parser.

```ts
import axios from 'axios';
import { Packages } from 'apt-parser';

const { data } = await axios.get('https://repo.chariz.com/Packages');
const packages = new Packages(data, {
	skipValidation: true
});
```
