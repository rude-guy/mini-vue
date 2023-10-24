import { NodeTypes } from './act';

enum TagType {
  START,
  END,
}

export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context));
}

function parseChildren(context) {
  const nodes: any[] = [];

  let node;
  if (context.source.startsWith('{{')) {
    node = parseInterpolation(context);
  } else if (context.source.startsWith('<')) {
    if (/[a-z]/.test(context.source[1])) {
      node = parseElement(context);
    }
  }

  nodes.push(node);
  return nodes;
}

function parseElement(context) {
  const element = parseTag(context, TagType.START);

  parseTag(context, TagType.END);

  return element;
}

function parseTag(context, type: TagType) {
  const match: any = /<\/?([a-z]*)/i.exec(context.source);
  const tag = match[1];

  // 删除标签
  advanceBy(context, match[0].length);
  advanceBy(context, 1);

  if (type === TagType.END) return;

  return {
    type: NodeTypes.ELEMENT,
    tag,
  };
}

function parseInterpolation(context) {
  const openDelimiter = '{{';
  const closeDelimiter = '}}';

  const closeIndex = context.source.indexOf(
    closeDelimiter,
    closeDelimiter.length
  );

  advanceBy(context, openDelimiter.length);

  const rawContentLength = closeIndex - openDelimiter.length;

  const rawContent = context.source.slice(0, rawContentLength);

  const content = rawContent.trim();

  advanceBy(context, rawContentLength + closeDelimiter.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      content: content,
    },
  };
}

function advanceBy(context, length: number) {
  context.source = context.source.slice(length);
}

function createRoot(children) {
  return {
    children,
  };
}

function createParserContext(content: string) {
  return {
    source: content,
  };
}
