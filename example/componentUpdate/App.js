import { h, ref } from '../../lib/guide-mini-vue-esm.js';

const Child = {
  name: 'Child',
  setup() {},
  render() {
    return h('p', {}, [
      h('div', {}, 'child - props - msg: ' + this.$props.msg),
    ]);
  },
};

export const App = {
  name: 'App',
  setup() {
    const msg = ref('123');
    const count = ref(1);
    window.msg = msg;

    const changeChildProps = () => {
      msg.value = '456';
    };

    const changeCount = () => {
      count.value++;
    };

    return {
      msg,
      count,
      changeChildProps,
      changeCount,
    };
  },
  render() {
    return h('div', {}, [
      h('div', {}, '您好'),
      h('button', { onClick: this.changeChildProps }, 'change child props'),
      h(Child, { msg: this.msg }),
      h('button', { onClick: this.changeCount }, 'change self count'),
      h('p', {}, 'count: ' + this.count),
    ]);
  },
};
