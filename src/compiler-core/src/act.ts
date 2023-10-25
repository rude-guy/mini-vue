import { CREATE_ELEMENT_BLOCK } from './runtimeHelpers';

export enum NodeTypes {
  INTERPOLATION,
  SIMPLE_EXPRESSION,
  ELEMENT,
  TEXT,
  Root,
  COMPOUND_EXPRESSION,
}

export function createVnodeCall(context, tag, props, children) {
  context.helper(CREATE_ELEMENT_BLOCK);

  return {
    type: NodeTypes.ELEMENT,
    tag,
    props,
    children,
  };
}
