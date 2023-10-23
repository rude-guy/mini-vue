import { h } from '../../lib/guide-mini-vue-esm.js';

import { ArrayToArray } from './ArrayToArray.js';
import { ArrayToText } from './ArrayToText.js';
import { TextToArray } from './TextToArray.js';
import { TextToText } from './TextToText.js';

export const App = {
  name: 'App',
  setup() {},
  render() {
    return h('div', { tIp: 1 }, [
      h('div', {}, '主页'),
      // 老的是数组，新的是文本
      // h(ArrayToText),
      // 老的是文本，新的是数组
      // h(TextToArray),
      // 老的是文本，新的是文本
      // h(TextToText),
      // 老的是数组，新的是数组
      h(ArrayToArray),
    ]);
  },
};
