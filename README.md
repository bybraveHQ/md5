# @bybrave/md5

Maintained fork of [`md5`](https://www.npmjs.com/package/md5) — a JS function for hashing messages with MD5.

Same API, **zero runtime dependencies**, dual **ESM + CommonJS**, **built-in TypeScript types**, and correct hashing of `ArrayBuffer` / `TypedArray` / `DataView`.

> ⚠️ MD5 is **not** cryptographically secure. Use it for checksums, cache keys, ETags and non-security fingerprints — never for passwords or signatures.

## Install

```sh
npm install @bybrave/md5
```

## Usage

```js
import md5 from '@bybrave/md5';

md5('message'); // "78e731027d8fd50ed642340b7c9a63b3"
```

CommonJS works too — `require` returns the function directly, exactly like the original:

```js
const md5 = require('@bybrave/md5');
md5('message');
```

Accepts strings, `Buffer`, `ArrayBuffer`, any `TypedArray`/`DataView`, and byte arrays:

```js
md5(Buffer.from('message'));
md5(new Uint8Array([1, 2, 3]));
md5(new ArrayBuffer(8));
```

### Options

| Option | Type | Effect |
|---|---|---|
| `asBytes` | `boolean` | Return the digest as a 16-element byte array instead of a hex string. |
| `asString` | `boolean` | Return the digest as a 16-char binary string instead of a hex string. |
| `encoding` | `'binary'` | Treat a string input as latin1 bytes instead of UTF-8. |

```js
md5('abc', { asBytes: true });  // [ 144, 1, 80, ... ]  (length 16)
md5('abc', { asString: true }); // 16-char binary string
md5('abc', { encoding: 'binary' });
```

## What's fixed vs `md5@2.3.0`

| Issue | Fix |
|---|---|
| [#49](https://github.com/pvorb/node-md5/issues/49) | `ArrayBuffer`, `DataView` and non-`Uint8Array` typed arrays were coerced via `toString()` (`"[object ArrayBuffer]"`) and produced a wrong digest. They now hash the actual buffer bytes — `md5(arrayBuffer)` matches `md5(new Uint8Array(arrayBuffer))`. |
| [#82](https://github.com/pvorb/node-md5/issues/82), [#68](https://github.com/pvorb/node-md5/pull/68) | Ships as native ESM with a CommonJS build via the `exports` map — `import` and `require` both work. |
| [#83](https://github.com/pvorb/node-md5/issues/83) | `asBytes` / `asString` / `encoding` options are documented (see above). |
| [#79](https://github.com/pvorb/node-md5/issues/79) | Number/object input is now coerced to its string form before hashing, so `md5(1003) === md5('1003')`. Previously a raw number produced an inconsistent, undocumented result. |
| — | Built-in TypeScript types — no separate `@types/md5` needed. |
| — | Zero runtime dependencies (`charenc`, `crypt`, `is-buffer` inlined). |

## Migration from `md5`

Drop-in for the common cases — replace the import:

```diff
- const md5 = require('md5');
+ const md5 = require('@bybrave/md5');
```

Hashes for **strings, `Buffer`, `Uint8Array` and byte arrays are byte-for-byte identical** to `md5@2.3.0`.

Two intentional behaviour changes in this major release:

- **`ArrayBuffer` / `DataView` / other typed arrays** now hash their real bytes (they were broken before — see #49).
- **Raw numbers/objects** now hash as `String(value)` (`md5(1003) === md5('1003')`). If you relied on the old number coercion, pass a string explicitly to reproduce a specific legacy value.

## Support

If this package saves you time, you can support maintenance:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-buy%20me%20a%20coffee-FF5E5B?logo=kofi&logoColor=white)](https://ko-fi.com/bybrave)
[![Bitcoin](https://img.shields.io/badge/Bitcoin-BTC-F7931A?logo=bitcoin&logoColor=white)](#support)

Bitcoin (BTC): `bc1q37557q5jpeaxqydzwvf3jgj7zhnfpn2td3q40q`

## License

BSD-3-Clause. Copyright © Paul Vorbach, Jeff Mott; fork © bybrave.
