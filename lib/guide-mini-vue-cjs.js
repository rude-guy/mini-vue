function createComponentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
    };
    return component;
}
function setupComponent(instance) {
    // TODO:
    // initProps()
    // initSlot();
    // 初始化有状态的componet
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const Componet = instance.type;
    const { setup } = Componet;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    // function or object
    // TODO function
    if (typeof setupResult === 'object') {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const Componet = instance.type;
    if (Componet.render) {
        instance.render = Componet.render;
    }
}

function render(vnode, container) {
    patch(vnode);
}
function patch(vnode, container) {
    // 处理component
    processComponent(vnode);
}
function processComponent(vnode, container) {
    mountComponent(vnode);
}
function mountComponent(vnode, container) {
    const instance = createComponentInstance(vnode);
    setupComponent(instance);
    setupRenderEffect(instance);
}
function setupRenderEffect(instance, container) {
    const subTree = instance.render();
    // vnode -> patch
    patch(subTree);
}

function createVnode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
    };
    return vnode;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            // component -> vnode
            const vnode = createVnode(rootComponent);
            render(vnode);
        },
    };
}

function h(type, props, children) {
    return createVnode(type, props, children);
}

export { createApp, h };
