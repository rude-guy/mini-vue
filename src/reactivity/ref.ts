import { isTracking, trackEffects, triggerEffects } from './effect';
import { reactive } from './reactive';
import { hasChanged, isObject } from '../shared';

class RefImpl {
  private _value: any;
  public dep;
  private _rawValue: any;
  public __v_isRef = true;
  constructor(value) {
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(val) {
  return isObject(val) ? reactive(val) : val;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(val) {
  return !!val.__v_isRef;
}

export function unRef(val) {
  return isRef(val) ? val.value : val;
}

export function proxyRefs(val) {
  return new Proxy(val, {
    get(target, key, receiver) {
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      const oldValue = Reflect.get(target, key);
      if (isRef(oldValue) && !isRef(value)) {
        return Reflect.set(oldValue, 'value', value);
      }
      return Reflect.set(target, key, value);
    },
  });
}
