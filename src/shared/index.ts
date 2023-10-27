export * from './toDisplayString';

export const extend = Object.assign;

export const EMPTY_OBJ = {};

export function isObject(val) {
  return val !== null && typeof val === 'object';
}

export function isString(val) {
  return typeof val === 'string';
}

export function hasChanged(val, newVal) {
  return !Object.is(val, newVal);
}

export function hasOwn(val, key) {
  return Object.prototype.hasOwnProperty.call(val, key);
}

export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toHandlerKey(str: string) {
  return str ? 'on' + capitalize(str) : '';
}
