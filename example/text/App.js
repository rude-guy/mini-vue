import { h, getCurrentInstance } from '../../lib/guide-mini-vue-esm.js';
import { Foo } from './Foo.js';

export const App = {
  name: 'App',
  render() {
    const app = h('div', {}, [h('div', {}, 'currentInstance dome'), h(Foo)]);

    return h('div', {}, [app]);
  },
  setup() {
    const app = getCurrentInstance();
    console.log('app', app);
  },
};
