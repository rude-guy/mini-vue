class ReactiveEffect {
  private _fn: any;
  constructor(
    _fn: any,
    public scheduler?
  ) {
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
  let depSet = keyMap.get(key);

  for (const _effect of depSet) {
    if (_effect.scheduler) {
      _effect.scheduler();
    } else {
      _effect.run();
    }
  }
}

let activeEffect;
export function effect(fn, options: any = {}) {
  const scheduler = options.scheduler;

  const _effect = new ReactiveEffect(fn, scheduler);

  _effect.run();

  return _effect.run.bind(_effect);
}
