import { isString } from '../../shared';
import { NodeTypes } from './act';
import {
  CREATE_ELEMENT_BLOCK,
  TO_DISPLAY_STRING,
  helperNameMap,
} from './runtimeHelpers';

export function generate(ast) {
  const context = createCodegenContext(ast);

  const { push } = context;

  genFunctionPreamble(ast, context);

  const functionName = 'render';
  const args = ['_ctx', '_cache'];
  const signature = args.join(', ');

  push(`function ${functionName}(${signature}) {`);

  push('return ');

  genNode(ast.codegenNode, context);

  push('}');

  return {
    code: context.code,
  };
}

function genFunctionPreamble(ast, context) {
  const { push } = context;
  const VueBinding = 'Vue';

  const helpers = ast.helpers;
  const aliasHelper = (s) => `${helperNameMap[s]}: _${helperNameMap[s]}`;

  if (helpers.length > 0) {
    push(`const { ${helpers.map(aliasHelper).join(', ')} } = ${VueBinding}`);
  }
  push('\n');

  push('return ');
}

function createCodegenContext(ast: any) {
  const context = {
    code: '',
    push(source) {
      context.code += source;
    },
    helper(k) {
      return `_${helperNameMap[k]}`;
    },
  };
  return context;
}

function genNode(node: any, context: any) {
  switch (node.type) {
    case NodeTypes.TEXT:
      genText(node, context);
      break;
    case NodeTypes.ELEMENT:
      genElement(node, context);
      break;
    case NodeTypes.INTERPOLATION:
      genInterpolation(node, context);
      break;
    case NodeTypes.SIMPLE_EXPRESSION:
      genExpression(node, context);
      break;
    case NodeTypes.COMPOUND_EXPRESSION:
      genCompoundExpression(node, context);
    default:
      break;
  }
}

function genCompoundExpression(node, context) {
  const { push } = context;
  const { children } = node;
  for (const child of children) {
    if (isString(child)) {
      push(child);
    } else {
      genNode(child, context);
    }
  }
}

function genText(node: any, context: any) {
  const { push } = context;
  push(`'${node.content}'`);
}

function genElement(node: any, context: any) {
  const { push, helper } = context;
  const { tag, props, children } = node;

  push(`${helper(CREATE_ELEMENT_BLOCK)}(`);

  genNodeList(genNullable([tag, props, children]), context);

  push(')');
}

function genNodeList(nodes, content) {
  const { push } = content;
  for (let i = 0; i < nodes.length; i++) {
    if (isString(nodes[i])) {
      push(nodes[i]);
    } else {
      genNode(nodes[i], content);
    }
    if (i < nodes.length - 1) {
      content.push(', ');
    }
  }
}

function genNullable(args: any[]) {
  return args.map((arg) => arg || 'null');
}

function genInterpolation(node: any, context: any) {
  const { push, helper } = context;
  push(`${helper(TO_DISPLAY_STRING)}(`);
  genNode(node.content, context);
  push(')');
}

function genExpression(node: any, context: any) {
  const { push } = context;
  push(node.content);
}
