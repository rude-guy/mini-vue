import { getCurrentInstance } from './component';

export function provide(key, value) {
  const currentInstance = getCurrentInstance();

  if (currentInstance) {
    let { provides } = currentInstance;
    const parentProvides = currentInstance.parent ? currentInstance.parent.provides : null;

    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }

    provides[key] = value;
  }
}

export function inject(key, defaultValue) {
  const currentInstance = getCurrentInstance();
  if (currentInstance.parent) {
    const { provides } = currentInstance.parent;
    const value = provides[key];
    if (value) {
      return value;
    } else if (defaultValue) {
      if (typeof defaultValue === 'function') {
        return defaultValue();
      }
      return defaultValue;
    }
  }
}
