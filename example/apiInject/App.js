import { h, provide, inject } from '../../lib/guide-mini-vue-esm.js';

const Provider = {
  name: 'Provider',
  setup() {
    provide('foo', 'fooVal');
    provide('bar', 'barVal');
  },
  render() {
    return h('div', {}, [h('p', {}, 'Provider'), h(ProviderTwo)]);
  },
};

const ProviderTwo = {
  name: 'Provider',
  setup() {
    provide('foo', 'providerTwoFooVal');
    const foo = inject('foo');
    const baz = inject('baz', () => 'defaultValBaz');

    return {
      foo,
      baz,
    };
  },
  render() {
    return h('div', {}, [h('p', {}, 'ProviderTwo: ' + this.foo + 'default: ' + this.baz), h(Customer)]);
  },
};

const Customer = {
  name: 'Customer',
  setup() {
    const foo = inject('foo');
    const bar = inject('bar');
    return { foo, bar };
  },

  render() {
    return h('div', {}, 'foo: ' + this.foo + '——bar: ' + this.bar);
  },
};

export const App = {
  name: 'App',
  render() {
    return h('div', {}, [h('p', {}, 'apiInject'), h(Provider)]);
  },
  setup() {},
};
