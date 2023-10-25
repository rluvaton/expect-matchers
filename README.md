# expect-matchers
[![npm](https://img.shields.io/npm/v/expect-matchers)](https://www.npmjs.com/package/expect-matchers)

## Why

### TL;DR
Currently, if you have a test like this and is using jest-extended:
```js
it('example', () => {
	const expected = Array.from({ length: 1000 }, (_, i) => ({
		i,
		value: 'expected'
	}));
	const actual = [...expected];
	const tmp = actual[200];
	actual[200] = actual[201];
	actual[201] = { ...tmp, value: 'hope you find me' };

	expect(actual).toIncludeSameMembers(expected);
});
```

You will get an error like this:
```js
   expect(received).toIncludeSameMembers(expected)

    Expected list to have the following members and no more:
      [{"i": 0, "value": "expected"}, {"i": 1, "value": "expected"}, {"i": 2, "value": "expected"}, {"i": 3, "value": "expected"}, {"i": 4, "value": "expected"}, {"i": 5, "value": "expected"}, {"i": 6, "value": "expected"}, {"i": 7, "value": "expected"}, {"i": 8, "value": "expected"}, {"i": 9, "value": "expected"}, …]
    Received:
      [{"i": 0, "value": "expected"}, {"i": 1, "value": "expected"}, {"i": 2, "value": "expected"}, {"i": 3, "value": "expected"}, {"i": 4, "value": "expected"}, {"i": 5, "value": "expected"}, {"i": 6, "value": "expected"}, {"i": 7, "value": "expected"}, {"i": 8, "value": "expected"}, {"i": 9, "value": "expected"}, …]

      410 |             actual[201] = { ...tmp, value: 'hope you find me' };
      411 |
    > 412 |             expect(actual).toIncludeSameMembers(expected);
          |                            ^
      413 |     });

```

**which is very hard to understand** so I instead this will be the error message:

```js
    expect(received).toIncludeSameMembers(expected)

    - Expected  - 1
    + Received  + 1

    @@ -799,11 +799,11 @@
          "i": 199,
          "value": "expected",
        },
        Object {
          "i": 200,
    -     "value": "expected",
    +     "value": "hope you find me",
        },
        Object {
          "i": 201,
          "value": "expected",
        },

      410 |             actual[201] = { ...tmp, value: 'hope you find me' };
      411 |
    > 412 |             expect(actual).toIncludeSameMembers(expected);
          |                            ^
      413 |     });
```

## Installation

With npm:

```sh
npm install --save-dev expect-matchers
```

With yarn:

```sh
yarn add -D expect-matchers
```

## Setup

```javascript
// ./testSetup.js

// add all expect-matchers matchers
import * as matchers from 'expect-matchers';
expect.extend(matchers);

// or just add specific matchers
import { toIncludeSameMembers } from 'expect-matchers';
expect.extend({ sinonToBeCalled, sinonToBeCalledTimes });
```

Add your setup script at the beginning of each test in jest it called (`setupFilesAfterEnv`)

### If you use jest
Add your setup script to your Jest `setupFilesAfterEnv` configuration. [See for help](https://jestjs.io/docs/en/configuration.html#setupfilesafterenv-array)

```json
"jest": {
  "setupFilesAfterEnv": ["./testSetup.js"]
}
```

To automatically extend `expect` with all matchers, you can use

```json
"jest": {
  "setupFilesAfterEnv": ["sinon-jest-matchers/all"]
}
```

### Typescript

If your editor does not recognise the custom `expect-matchers` matchers, add a `global.d.ts` file to your project with:

```ts
import 'expect-matchers';
```

## Matchers

- [ ] TODO - add matcher docs

## Inspirations and credits
2. `jest-extended` for the loading, setup some of the code and the file directory structure

