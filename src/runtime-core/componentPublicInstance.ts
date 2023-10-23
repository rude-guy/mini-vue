import { proxyRefs } from '../reactivity';
import { hasOwn } from '../shared';

const publicPropertiesMap = {
  $el: (i) => i.vnode.el,
  $slots: (i) => i.slots,
  $props: (i) => i.props,
};

export const publicInstanceProxyHandlers = {
  get({ _: instance }, key, receiver) {
    const { setupState } = instance;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(instance.props, key)) {
      return instance.props[key];
    }

    const publicGetter = publicPropertiesMap[key];

    if (publicGetter) {
      return publicGetter(instance);
    }
  },
};
