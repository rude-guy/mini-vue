import { NodeTypes } from '../src/act';
import { baseParse } from '../src/parse';

describe('Parse', () => {
  describe('Interpolation', () => {
    it('simple interpolation', () => {
      const ast = baseParse('{{message}}');

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.INTERPOLATION,
        content: {
          type: NodeTypes.SIMPLE_EXPRESSION,
          content: 'message',
        },
      });
    });
  });

  describe('element', () => {
    it('simple element div', () => {
      const ast = baseParse('<div></div>');

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.ELEMENT,
        tag: 'div',
        children: [],
      });
    });
  });

  describe('text', () => {
    it('simple text', () => {
      const ast = baseParse('some text');

      expect(ast.children[0]).toStrictEqual({
        type: NodeTypes.TEXT,
        content: 'some text',
      });
    });
  });

  test('hello word', () => {
    const ast = baseParse('<div>hello{{message}}</div>');

    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.ELEMENT,
      tag: 'div',
      children: [
        {
          type: NodeTypes.TEXT,
          content: 'hello',
        },
        {
          type: NodeTypes.INTERPOLATION,
          content: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: 'message',
          },
        },
      ],
    });
  });
  test('Nested element', () => {
    const ast = baseParse('<div><p>hello</p>{{message}}</div>');

    expect(ast.children[0]).toStrictEqual({
      type: NodeTypes.ELEMENT,
      tag: 'div',
      children: [
        {
          type: NodeTypes.ELEMENT,
          tag: 'p',
          children: [
            {
              type: NodeTypes.TEXT,
              content: 'hello',
            },
          ],
        },
        {
          type: NodeTypes.INTERPOLATION,
          content: {
            type: NodeTypes.SIMPLE_EXPRESSION,
            content: 'message',
          },
        },
      ],
    });
  });

  test('should throw error when lack of end tag', () => {
    expect(() => {
      baseParse('<div><span></div>');
    }).toThrow('缺少结束标签span');
  });
});
