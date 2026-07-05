export type Md5Input =
  | string
  | ArrayBuffer
  | ArrayBufferView
  | number[]
  | number;

export interface Md5Options {
  /** Вернуть дайджест массивом байтов вместо hex-строки. */
  asBytes?: boolean;
  /** Вернуть дайджест бинарной строкой вместо hex-строки. */
  asString?: boolean;
  /** Трактовать строковый ввод как latin1-байты, а не UTF-8. */
  encoding?: 'binary';
}

/** MD5-дайджест массивом байтов. */
declare function md5(
  message: Md5Input,
  options: Md5Options & { asBytes: true }
): number[];
/** MD5-дайджест бинарной строкой. */
declare function md5(
  message: Md5Input,
  options: Md5Options & { asString: true }
): string;
/** MD5-дайджест hex-строкой (по умолчанию). */
declare function md5(message: Md5Input, options?: Md5Options): string;

export default md5;
