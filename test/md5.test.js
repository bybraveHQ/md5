import { test } from 'node:test';
import assert from 'node:assert';
import md5 from '../index.js';

// --- Порт оригинального suite (pvorb/node-md5) ---

test('throws for undefined', () => {
  assert.throws(() => md5(undefined));
});

test('hashes the string "undefined"', () => {
  assert.equal(md5('undefined'), '5e543256c480ac577d30f76f9120eb74');
});

test('throws for null', () => {
  assert.throws(() => md5(null));
});

test('expected hash for "message"', () => {
  assert.equal(md5('message'), '78e731027d8fd50ed642340b7c9a63b3');
});

test('different hashes for different numbers', () => {
  assert.notEqual(md5(1), md5(2));
});

test('supports Node.js Buffers', () => {
  const buffer = Buffer.from('message áßäöü', 'utf8');
  assert.equal(md5(buffer), md5('message áßäöü'));
});

test('binary encoded string', () => {
  const hash1 = md5('abc', { asString: true });
  const hash3 = md5(hash1 + 'a', { encoding: 'binary' });
  assert.equal(hash3, '131f0ac52813044f5110e4aec638c169');
});

test('supports Uint8Array', () => {
  const message = 'foobarbaz';
  const u8 = Uint8Array.from(message, (c) => c.charCodeAt(0));
  assert.equal(md5(u8), md5(message));
});

// --- RFC 1321 A.5 контрольные векторы ---

test('RFC 1321 test suite', () => {
  const vectors = [
    ['', 'd41d8cd98f00b204e9800998ecf8427e'],
    ['a', '0cc175b9c0f1b6a831c399e269772661'],
    ['abc', '900150983cd24fb0d6963f7d28e17f72'],
    ['message digest', 'f96b697d7cb7938d525a2f31aaf161d0'],
    ['abcdefghijklmnopqrstuvwxyz', 'c3fcd3d76192e4007dfb496cca67e13b'],
    [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      'd174ab98d277d9f5a5611c2c9f419d9f',
    ],
    [
      '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
      '57edf4a22be3c955ac49da2e2107b67a',
    ],
  ];
  for (const [input, expected] of vectors) {
    assert.equal(md5(input), expected, `md5(${JSON.stringify(input)})`);
  }
});

// --- Фиксы форка ---

test('#49: ArrayBuffer hashes buffer bytes, not "[object ArrayBuffer]"', () => {
  const ab = new ArrayBuffer(9);
  const u8 = new Uint8Array(ab);
  assert.equal(md5(ab), md5(u8));
  // Значение совпадает с js-md5 из issue #49
  assert.equal(md5(ab), '3f2829b2ffe8434d67f98a2a98968652');
});

test('#49: ArrayBuffer with content', () => {
  const u8 = Uint8Array.from('abc', (c) => c.charCodeAt(0));
  assert.equal(md5(u8.buffer), md5('abc'));
});

test('#49: DataView hashes underlying bytes', () => {
  const u8 = Uint8Array.from('message', (c) => c.charCodeAt(0));
  const view = new DataView(u8.buffer);
  assert.equal(md5(view), md5('message'));
});

test('#49: typed array views hash their byte range', () => {
  const bytes = Uint8Array.from([1, 2, 3, 4, 5, 6]);
  const u16 = new Uint16Array(bytes.buffer);
  assert.equal(md5(u16), md5(bytes));
});

test('#49: subarray respects byteOffset/byteLength', () => {
  const full = Uint8Array.from([9, 9, 1, 2, 3, 9]);
  const sub = full.subarray(2, 5); // [1,2,3]
  assert.equal(md5(sub), md5(Uint8Array.from([1, 2, 3])));
});

test('#79: number input matches its string form', () => {
  assert.equal(md5(1003), md5('1003'));
  assert.equal(md5(42), md5('42'));
});

test('array of bytes is hashed as-is', () => {
  const bytes = [104, 105]; // "hi"
  assert.equal(md5(bytes), md5('hi'));
});

test('asBytes returns a 16-byte array', () => {
  const bytes = md5('abc', { asBytes: true });
  assert.ok(Array.isArray(bytes));
  assert.equal(bytes.length, 16);
});

test('asString returns 16-char binary string', () => {
  const str = md5('abc', { asString: true });
  assert.equal(typeof str, 'string');
  assert.equal(str.length, 16);
});

test('empty string', () => {
  assert.equal(md5(''), 'd41d8cd98f00b204e9800998ecf8427e');
});

test('multi-block input (>64 bytes)', () => {
  const long = 'x'.repeat(1000);
  assert.equal(md5(long), md5(Buffer.from(long)));
  assert.equal(md5(long), '398533d48111e9f664b1f64cb10c4b63');
});
