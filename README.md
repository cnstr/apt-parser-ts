# APT Parser

This library is capable of parsing files used within the [APT Package Manager](https://en.wikipedia.org/wiki/APT_(software)).<br>
A typical APT repository advertises a release file and packages file, both of which use a key-value organization system to declare information. This library is able to parse the data and return it as type-safe objects for usage in JavaScript and TypeScript projects.<br>

### Installation
`npm install --save apt-parser`<br>

### Basic Usage
Here's an example for getting the information out of a Release file:<br>
```ts
import axios from 'axios';
import { parseRelease } from 'apt-parser';

const { data } = await axios.get('http://archive.ubuntu.com/ubuntu/dists/jammy/Release');
const releaseMap = parseRelease(data);

console.log(releaseMap.get('Origin')); // => Ubuntu
console.log(releaseMap.get('Version')); // => 22.04
console.log(releaseMap.get('InvalidKey')); // => null
```

Here's an example for getting the information out of a Packages file:<br>
```ts
import axios from 'axios';
import { parseRelease } from 'apt-parser';

const { data } = await axios.get('https://repo.chariz.com/Packages');
const packages = parsePackages(data);

for (const packageMap of packages) {
	console.log(packageMap.get('Package')); // Package Identifier
	console.log(packageMap.get('InvalidKey')); // => null
}
```
