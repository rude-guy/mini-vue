class ReactiveEffect {
  private _fn: any;
  constructor(_fn: any) {
    this._fn = _fn;
  }

  run() {
    activeEffect = this;
    return this._fn();
  }
}

const targetMap = new Map();
export function track(target, key) {
  // target -> key -> dep
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
}

export function trigger(target, key) {
  const keyMap = targetMap.get(target);
  const depSet = keyMap.get(key);

  for (const _effect of depSet) {
    _effect.run();
  }
}

let activeEffect;
export function effect(fn) {
  const _effect = new ReactiveEffect(fn);

  _effect.run();

  return _effect.run.bind(_effect);
}
