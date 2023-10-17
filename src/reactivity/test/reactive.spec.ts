import { isProxy, isReactive, reactive } from '../reactive';

describe('reacitve', () => {
  it('happy paty', () => {
    const original = { foo: 10, bar: { baz: { a: 1 } } };
    const observed = reactive(original);
    expect(original).not.toBe(observed);
    expect(observed.foo).toBe(10);

    // isReactive
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);

    expect(isReactive(observed.bar.baz)).toBe(true);
    expect(isReactive(original.bar)).toBe(false);
    expect(isProxy(observed)).toBe(true);
  });
});
