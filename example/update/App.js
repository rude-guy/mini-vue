import { h, ref } from '../../lib/guide-mini-vue-esm.js';

export const App = {
  name: 'App',
  setup() {
    const count = ref(0);
    const onClick = () => {
      count.value++;
    };

    const props = ref({
      foo: 'foo',
      bar: 'bar',
    });

    const onChangePropsDome1 = () => {
      props.value.foo = 'new-foo';
    };

    const onChangePropsDome2 = () => {
      props.value.foo = undefined;
    };

    const onChangePropsDome3 = () => {
      props.value = {
        foo: 'foo',
      };
    };

    return {
      count,
      onClick,

      props,
      onChangePropsDome1,
      onChangePropsDome2,
      onChangePropsDome3,
    };
  },
  render() {
    return h(
      'div',
      {
        id: 'root',
        ...this.props,
      },
      [
        h('div', {}, 'count: ' + this.count),
        h(
          'button',
          {
            onClick: this.onClick,
          },
          'click'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDome1,
          },
          'changeProps: 值改变了'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDome2,
          },
          'changeProps: 值变为undefined'
        ),
        h(
          'button',
          {
            onClick: this.onChangePropsDome3,
          },
          'changeProps: key在新的值没有了'
        ),
      ]
    );
  },
};
