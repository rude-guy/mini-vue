import { h, renderSlots, createTextVnode } from '../lib/guide-mini-vue-esm.js';

export const Foo = {
  name: 'Foo',
  setup(props) {},
  render() {
    const foo = h('p', {}, 'Foo');
    console.log(this.$slots);
    return h('div', {}, [
      renderSlots(this.$slots, 'header', {
        age: 10,
      }),
      createTextVnode('我是谁'),
      foo,
      renderSlots(this.$slots, 'footer'),
    ]);
  },
};
