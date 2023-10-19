import { h } from '../lib/guide-mini-vue-esm.js';

export const Foo = {
  name: 'Foo',
  setup(props, { emit }) {
    console.log(props);

    // props.count++;
    const handleAdd = () => {
      emit('add', 1, 2);
      emit('add-foo', 10, 11);
    };

    return {
      handleAdd,
    };
  },
  render() {
    const btn = h(
      'button',
      {
        onClick: this.handleAdd,
      },
      '按钮'
    );

    const Foo = h('div', {}, 'Foo' + this.count);
    return h('div', {}, [Foo, btn]);
  },
};
