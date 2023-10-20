import { createVnode } from './vnode';

export function createAppAPI(render) {
  return function createApp(rootComponent) {
    return {
      mount(rootContainer) {
        // component -> vnode
        const vnode = createVnode(rootComponent);
        render(vnode, rootContainer);
      },
    };
  };
}
