import { NodeType } from 'module/mod-flow/node/type';

interface NodeList {
  [key: string]: NodeType;
}
export const NODETYPE: NodeList = {
  START: 'start',
  APPROVAL: 'approval',
  CC: 'cc',
  EXCLUSIVE: 'exclusive',
  TIMER: 'timer',
  NOTIFY: 'notify',
  CONDITION: 'condition',
  END: 'end',
};
