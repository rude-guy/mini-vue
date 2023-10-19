import { shallowReadonly } from '../reactivity/reactive';
import { emit } from './componentEmit';
import { initProps } from './componentProps';
import { publicInstanceProxyHandlers } from './componentPublicInstance';
import { initSlot } from './componentSlots';

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    emit: () => {},
  };

  component.emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);

  initSlot(instance, instance.vnode.children);

  // 初始化有状态的component
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const Component = instance.type;

  instance.proxy = new Proxy({ _: instance }, publicInstanceProxyHandlers);

  const { setup } = Component;
  if (setup) {
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    handleSetupResult(instance, setupResult);
  }
}

function handleSetupResult(instance: any, setupResult: any) {
  // function or object
  // TODO function

  if (typeof setupResult === 'object') {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}

function finishComponentSetup(instance: any) {
  const Component = instance.type;

  if (Component.render) {
    instance.render = Component.render;
  }
}
