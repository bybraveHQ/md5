// Компилируется в CI (npm run test-types) — проверяет, что типы совпадают с рантаймом.
import md5 from '../index.js';

const hex: string = md5('abc');
const fromBuffer: string = md5(Buffer.from('abc'));
const fromArrayBuffer: string = md5(new ArrayBuffer(4));
const fromView: string = md5(new Uint8Array([1, 2, 3]));
const fromBytes: string = md5([1, 2, 3]);
const fromNumber: string = md5(1003);

const bytes: number[] = md5('abc', { asBytes: true });
const asStr: string = md5('abc', { asString: true });
const binary: string = md5('abc', { encoding: 'binary' });

void [hex, fromBuffer, fromArrayBuffer, fromView, fromBytes, fromNumber, bytes, asStr, binary];
