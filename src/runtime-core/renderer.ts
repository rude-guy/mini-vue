import { isObject } from '../reactivity/shared';
import { createComponentInstance, setupComponent } from './component';

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode: any, container: any) {
  if (typeof vnode.type === 'string') {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
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
  if (typeof children === 'string') {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(vnode, el);
  }

  // props
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
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
