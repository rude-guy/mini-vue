import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options) {
  const { createElement, createText, patchProps, insert } = options;

  function render(vnode, container) {
    patch(vnode, container, null);
  }

  function patch(vnode: any, container: any, parentComponent: any) {
    switch (vnode.type) {
      case Fragment:
        processFragment(vnode, container, parentComponent);
        break;
      case Text:
        processText(vnode, container);
        break;
      default:
        if (vnode.shapeFlag & ShapeFlags.ELEMENT) {
          processElement(vnode, container, parentComponent);
        } else if (vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理component
          processComponent(vnode, container, parentComponent);
        }
        break;
    }
  }

  function processText(vnode: any, container: any) {
    const el = (vnode.el = createText(vnode.children));
    insert(el, container);
  }

  function processFragment(vnode: any, container: any, parentComponent: any) {
    mountChildren(vnode, container, parentComponent);
  }

  function processElement(vnode: any, container: any, parentComponent: any) {
    mountElement(vnode, container, parentComponent);
  }

  function mountElement(vnode: any, container: any, parentComponent: any) {
    const el = (vnode.el = createElement(vnode.type));

    const { props, children } = vnode;

    // string array
    if (vnode.shapeFlag & ShapeFlags.TEXT_CHILDREN) {
      el.textContent = children;
    } else if (vnode.shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
      mountChildren(vnode, el, parentComponent);
    }

    // props
    for (const key in props) {
      const val = props[key];
      patchProps(el, key, val);
    }

    insert(el, container);
  }

  function mountChildren(vnode, container, parentComponent) {
    const { children } = vnode;
    children.forEach((v) => {
      patch(v, container, parentComponent);
    });
  }

  function processComponent(vnode: any, container: any, parentComponent: any) {
    mountComponent(vnode, container, parentComponent);
  }

  function mountComponent(initinalVnode: any, container: any, parentComponent: any) {
    const instance = createComponentInstance(initinalVnode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, initinalVnode, container);
  }

  function setupRenderEffect(instance: any, initinalVnode: any, container: any) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);

    // vnode -> patch

    patch(subTree, container, instance);

    initinalVnode.el = subTree.el;
  }

  return {
    createApp: createAppAPI(render),
  };
}
