import { h } from '../lib/guide-mini-vue-esm.js';
export const App = {
  render() {
    return h(
      'div',
      {
        id: 'root',
        class: 'container',
      },
      [h('p', { class: 'red' }, 'hello world'), h('p', { class: 'blue' }, 'hello mini-vue')]
    );
  },
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
};
