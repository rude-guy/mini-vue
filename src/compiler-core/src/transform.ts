import { NodeTypes } from './act';
import { TO_DISPLAY_STRING } from './runtimeHelpers';

export function transform(root, options = {}) {
  const context = createTransformContext(root, options);
  transformNode(root, context);
  createCodegen(root);
  root.helpers = Array.from(context.helpers.keys());
}

function createCodegen(root) {
  root.codegenNode = root.children[0];
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

  for (const transform of nodeTransforms) {
    transform(node);
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
}

function transformChildren(node: any, context: any) {
  const children = node.children;

  for (const child of children) {
    transformNode(child, context);
  }
}
