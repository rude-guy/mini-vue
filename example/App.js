import { h } from '../lib/guide-mini-vue-esm.js';

window.self = null;
export const App = {
  render() {
    window.self = this;
    return h(
      'div',
      {
        id: 'root',
        class: 'container',
      },
      'hi ' + this.msg
      // [h('p', { class: 'red' }, 'hello world'), h('p', { class: 'blue' }, 'hello mini-vue')]
    );
  },
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
};
