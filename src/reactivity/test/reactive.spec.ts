import { isReactive, reactive } from '../reactive';

describe('reacitve', () => {
  it('happy paty', () => {
    const original = { foo: 10 };
    const observed = reactive(original);
    expect(original).not.toBe(observed);
    expect(observed.foo).toBe(10);

    // isReactive
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(original)).toBe(false);
  });
});
