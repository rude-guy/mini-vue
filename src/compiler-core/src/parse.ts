import { NodeTypes } from './act';

enum TagType {
  START,
  END,
}

export function baseParse(content: string) {
  const context = createParserContext(content);
  return createRoot(parseChildren(context, []));
}

function parseChildren(context, ancestors) {
  const nodes: any[] = [];

  while (!isEnd(context, ancestors)) {
    let node;
    if (context.source.startsWith('{{')) {
      node = parseInterpolation(context);
    } else if (context.source.startsWith('<')) {
      if (/[a-z]/.test(context.source[1])) {
        node = parseElement(context, ancestors);
      }
    }
    if (!node) {
      node = parseText(context);
    }
    nodes.push(node);
  }

  return nodes;
}

function isEnd(context, ancestors) {
  const s = context.source;
  if (s.startsWith('</')) {
    for (let i = ancestors.length - 1; i >= 0; i--) {
      const tag = ancestors[i].tag;
      if (startsWithEndTagOpen(s, tag)) {
        return true;
      }
    }
  }
  return !s;
}

function parseText(context) {
  let endIndex = context.source.length;
  let endTokens = ['<', '{{'] as const;

  for (const token of endTokens) {
    const index = context.source.indexOf(token);
    if (index !== -1 && endIndex > index) {
      endIndex = index;
    }
  }
  const content = parseTextData(context, endIndex);

  return {
    type: NodeTypes.TEXT,
    content,
  };
}

function parseTextData(context: any, length: number) {
  const content = context.source.slice(0, length);

  advanceBy(context, length);
  return content;
}

function parseElement(context, ancestors) {
  const element: any = parseTag(context, TagType.START);

  ancestors.push(element);
  element.children = parseChildren(context, ancestors);
  ancestors.pop();

  if (startsWithEndTagOpen(context.source, element.tag)) {
    parseTag(context, TagType.END);
  } else {
    throw new Error('缺少结束标签' + element.tag);
  }

  return element;
}

function startsWithEndTagOpen(source: string, tag: string) {
  return (
    source.startsWith('</') &&
    source.slice(2, tag.length + 2).toLocaleLowerCase() ===
      tag.toLocaleLowerCase()
  );
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

  const rawContent = parseTextData(context, rawContentLength);

  const content = rawContent.trim();

  advanceBy(context, closeDelimiter.length);

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
    type: NodeTypes.Root,
  };
}

function createParserContext(content: string) {
  return {
    source: content,
  };
}
