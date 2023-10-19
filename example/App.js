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
        onClick: () => {
          console.log('click');
        },
        onMousedown: () => {
          console.log('mouseDown');
        },
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
