import { ShapeFlags } from '../shared/shapeFlags';

export const Fragment = Symbol('Fragment');
export const Text = Symbol('Text');

export { createVnode as createElementBlock };

export function createVnode(type, props?, children?) {
  const vnode = {
    type,
    props: props || {},
    component: null,
    key: props?.key,
    children,
    shapeFlag: getShapeFlag(type),
    el: null,
  };

  if (typeof children === 'string') {
    vnode.shapeFlag |= ShapeFlags.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.shapeFlag |= ShapeFlags.ARRAY_CHILDREN;
  }

  if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    if (typeof vnode.children === 'object') {
      vnode.shapeFlag |= ShapeFlags.SLOT_CHILDREN;
    }
  }

  return vnode;
}

export function createTextVnode(text: string) {
  return createVnode(Text, {}, text);
}

function getShapeFlag(type) {
  return typeof type === 'string'
    ? ShapeFlags.ELEMENT
    : ShapeFlags.STATEFUL_COMPONENT;
}
