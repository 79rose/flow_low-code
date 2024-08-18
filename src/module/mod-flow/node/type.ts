/**
 * start: 开始节点
 * approval: 审批节点
 * cc: 抄送节点
 * exclusive: 排他网关
 * timer: 定时节点
 * notify: 通知节点
 * condition: 条件节点
 * end: 结束节点
 */
export type NodeType =
  | 'start'
  | 'approval'
  | 'cc'
  | 'exclusive'
  | 'timer'
  | 'notify'
  | 'condition'
  | 'end';

/**
 * FlowNode: 流程节点
 * id: 节点ID
 * pid: 父节点ID
 * name: 节点名称
 * type: 节点类型
 * executionListeners: 节点监听器
 * child: 子节点
 */
export interface FlowNode {
  id: string;
  pid?: string;
  name: string;
  type: NodeType;
  executionListeners?: NodeListener[];
  child?: FlowNode;
}

/**
 * NodeListener: 节点监听器
 * event: 监听事件
 * implementationType: 实现类型
 * implementation: 实现
 */
export interface NodeListener {
  event: string;
  implementationType: 'class' | 'expression' | 'delegateExpression';
  implementation: string;
}

/**
 * id: 节点ID
 * name: 节点名称
 * message: 错误信息
 */
export interface ErrorInfo {
  id: string;
  name: string;
  message: string;
}

export interface FormProperty {
  // 字段ID
  id: string;
  // 字段名称
  name: string;
  // 只读
  readonly: boolean;
  // 必填
  required: boolean;
  // 隐藏
  hidden: boolean;
}

/**
 * StartNode: 开始节点
 * formProperties: 表单属性
 */
export interface StartNode extends FlowNode {
  formProperties: FormProperty[];
}
