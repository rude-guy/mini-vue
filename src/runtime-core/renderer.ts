import { isObject } from '../shared';
import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
    processElement(vnode, container);
  } else if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
    // 处理component
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const el = (vnode.el = document.createElement(vnode.type));

  const { props, children } = vnode;

  // string array
  if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }

  // props
  for (const key in props) {
    const val = props[key];
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }

  container.appendChild(el);
}

function mountChildren(vnode, container) {
  const { children } = vnode;
  children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountComponent(initinalVnode: any, container: any) {
  const instance = createComponentInstance(initinalVnode);
  setupComponent(instance);
  setupRenderEffect(instance, initinalVnode, container);
}

function setupRenderEffect(instance: any, initinalVnode: any, container: any) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);

  // vnode -> patch

  patch(subTree, container);

  initinalVnode.el = subTree.el;
}
