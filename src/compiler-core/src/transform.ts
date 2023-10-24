export function transform(root, options) {
  const context = createTransformContext(root, options);
  transformNode(root, context);
}

function createTransformContext(root, options) {
  return {
    root,
    nodeTransforms: options.nodeTransforms || [],
  };
}

function transformNode(node, context) {
  const { nodeTransforms } = context;

  for (const transform of nodeTransforms) {
    transform(node);
  }

  const children = node.children || [];

  for (const child of children) {
    transformNode(child, context);
  }
}
