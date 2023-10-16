import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export function reactive(raw) {
  return createActiveObjcet(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObjcet(raw, readonlyHandlers);
}

function createActiveObjcet(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
