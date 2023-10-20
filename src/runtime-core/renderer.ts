import { effect } from '../reactivity';
import { ShapeFlags } from '../shared/shapeFlags';
import { createComponentInstance, setupComponent } from './component';
import { createAppAPI } from './createApp';
import { Fragment, Text } from './vnode';

export function createRenderer(options) {
  const { createElement: hostCreateElement, createText: hostCreateText, patchProps: hostPatchProps, insert: hostInsert } = options;

  function render(n2, container) {
    patch(null, n2, container, null);
  }

  function patch(n1: any, n2: any, container: any, parentComponent: any) {
    switch (n2.type) {
      case Fragment:
        processFragment(n1, n2, container, parentComponent);
        break;
      case Text:
        processText(n1, n2, container);
        break;
      default:
        if (n2.shapeFlag & ShapeFlags.ELEMENT) {
          processElement(n1, n2, container, parentComponent);
        } else if (n2.shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
          // 处理component
          processComponent(n1, n2, container, parentComponent);
        }
        break;
    }
  }

  function processText(n1: any, n2: any, container: any) {
    const el = (n2.el = hostCreateText(n2.children));
    hostInsert(el, container);
  }

  function processFragment(n1: any, n2: any, container: any, parentComponent: any) {
    mountChildren(n2, container, parentComponent);
  }

  function processElement(n1: any, n2: any, container: any, parentComponent: any) {
    if (!n1) {
      mountElement(n2, container, parentComponent);
    } else {
      patchElement(n1, n2, container);
    }
  }

  function patchElement(n1: any, n2: any, container: any) {
    console.log('prevnode', n1);
    console.log('nextnode', n2);

    // props
    // children
  }

  function mountElement(vnode: any, container: any, parentComponent: any) {
    const el = (vnode.el = hostCreateElement(vnode.type));

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
      hostPatchProps(el, key, val);
    }

    hostInsert(el, container);
  }

  function mountChildren(vnode, container, parentComponent) {
    const { children } = vnode;
    children.forEach((v) => {
      patch(null, v, container, parentComponent);
    });
  }

  function processComponent(n1: any, n2: any, container: any, parentComponent: any) {
    mountComponent(n2, container, parentComponent);
  }

  function mountComponent(initinalVnode: any, container: any, parentComponent: any) {
    const instance = createComponentInstance(initinalVnode, parentComponent);
    setupComponent(instance);
    setupRenderEffect(instance, initinalVnode, container);
  }

  function setupRenderEffect(instance: any, initinalVnode: any, container: any) {
    effect(() => {
      if (!instance.isMounted) {
        const { proxy } = instance;
        const subTree = (instance.subTree = instance.render.call(proxy));

        // vnode -> patch

        patch(null, subTree, container, instance);

        initinalVnode.el = subTree.el;

        instance.isMounted = true;
      } else {
        const { proxy } = instance;

        const subTree = instance.render.call(proxy);
        const prevTree = instance.subTree;

        instance.subTree = subTree;

        patch(prevTree, subTree, container, instance);
      }
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
