import { render } from './renderer';
import { createVnode } from './vnode';

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // component -> vnode
      const vnode = createVnode(rootComponent);
      render(vnode, document.querySelector(rootContainer));
    },
  };
}
