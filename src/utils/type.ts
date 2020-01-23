
function _toString(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function isNull(val: unknown): val is null {
  return _toString(val) === 'Null'
}

export function isUndef(val: unknown): val is undefined {
  return _toString(val) === 'Undefined'
}

export function isVoid(val: unknown): val is null | undefined {
  return ['Null', 'Undefined'].includes(_toString(val))
}

export function isPlainObject(val: unknown): val is object {
  return _toString(val) === 'Object'
}

export function isString(val: unknown): val is string {
  return _toString(val) === 'String'
}

export function isArray<T = any>(val: unknown): val is T[] {
  return _toString(val) === 'Array'
}
