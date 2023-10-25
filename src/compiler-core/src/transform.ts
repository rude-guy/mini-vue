import { NodeTypes } from './act';
import { TO_DISPLAY_STRING } from './runtimeHelpers';

export function transform(root, options = {}) {
  const context = createTransformContext(root, options);
  transformNode(root, context);
  createCodegen(root);
  root.helpers = Array.from(context.helpers.keys());
}

function createCodegen(root) {
  const child = root.children[0];

  if (child.type === NodeTypes.ELEMENT) {
    root.codegenNode = child.codegenNode;
  } else {
    root.codegenNode = root.children[0];
  }
}

function createTransformContext(root, options) {
  const context = {
    root,
    nodeTransforms: options.nodeTransforms || [],
    helpers: new Map(),
    helper(key) {
      context.helpers.set(key, 1);
    },
  };
  return context;
}

function transformNode(node, context) {
  const { nodeTransforms } = context;

  const exitFn: any[] = [];

  for (const transform of nodeTransforms) {
    const onExit = transform(node, context);
    if (typeof onExit === 'function') {
      exitFn.push(onExit);
    }
  }

  switch (node.type) {
    case NodeTypes.INTERPOLATION:
      context.helper(TO_DISPLAY_STRING);
      break;
    case NodeTypes.Root:
    case NodeTypes.ELEMENT:
      transformChildren(node, context);
    default:
      break;
  }

  let i = exitFn.length;
  while (i--) {
    exitFn[i]();
  }
}

function transformChildren(node: any, context: any) {
  const children = node.children;

  for (const child of children) {
    transformNode(child, context);
  }
}
