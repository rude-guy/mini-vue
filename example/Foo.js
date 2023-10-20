import { h, getCurrentInstance } from '../lib/guide-mini-vue-esm.js';

export const Foo = {
  name: 'Foo',
  setup() {
    const app = getCurrentInstance();
    console.log('app', app);
  },
  render() {
    return h('p', {}, 'Foo');
  },
};
