import { mutableHandlers, readonlyHandlers, shallowReadonlyHandlers } from './baseHandlers';

export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive',
  IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
  return createActiveObjcet(raw, mutableHandlers);
}

export function readonly(raw) {
  return createActiveObjcet(raw, readonlyHandlers);
}

export function shallowReadonly(raw) {
  return createActiveObjcet(raw, shallowReadonlyHandlers);
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY];
}

export function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}

function createActiveObjcet(raw, baseHandlers) {
  return new Proxy(raw, baseHandlers);
}
