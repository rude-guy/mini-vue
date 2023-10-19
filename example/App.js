import { h } from '../lib/guide-mini-vue-esm.js';
import { Foo } from './Foo.js';

window.self = null;
export const App = {
  name: 'App',
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
      ['hi ' + this.msg, h('p', { class: 'red' }, 'hello world'), h(Foo, { class: 'blue', count: 1 })]
    );
  },
  setup() {
    return {
      msg: 'mini-vue',
    };
  },
};
