import { NodeTypes, createVnodeCall } from '../act';

export function transformElement(node, context) {
  if (node.type === NodeTypes.ELEMENT) {
    return () => {
      const vnodeTag = `"${node.tag}"`;

      let vnodeProps;

      const children = node.children;

      let vnodeChildren = children[0];

      node.codegenNode = createVnodeCall(
        context,
        vnodeTag,
        vnodeProps,
        vnodeChildren
      );
    };
  }
}
