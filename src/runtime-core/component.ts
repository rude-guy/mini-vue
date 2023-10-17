export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component;
}

export function setupComponent(instance) {
  // TODO:
  // initProps()
  // initSlot();

  // 初始化有状态的componet
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const Componet = instance.type;

  const { setup } = Componet;
  if (setup) {
    const setupResult = setup();

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
  const Componet = instance.type;

  if (Componet.render) {
    instance.render = Componet.render;
  }
}
