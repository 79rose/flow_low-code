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

export interface BranchNode extends FlowNode {
  children: FlowNode[];
}

export interface ExclusiveNode extends BranchNode {
  children: ConditionNode[];
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
export interface BranchNode extends FlowNode {
  children: FlowNode[];
}

/**
 * StartNode: 开始节点
 * formProperties: 表单属性
 */
export interface StartNode extends FlowNode {
  formProperties: FormProperty[];
}
export interface CcNode extends AssigneeNode {
  formProperties: FormProperty[];
}

export interface NotifyNode extends AssigneeNode {
  types: ('site' | 'email' | 'sms' | 'wechat' | 'dingtalk' | 'feishu')[];
  subject: string;
  content: string;
}

export interface TimerNode extends FlowNode {
  waitType: 'duration' | 'date';
  unit: 'PT%sS' | 'PT%sM' | 'PT%sH' | 'P%sD' | 'P%sW' | 'P%sM';
  duration: number;
  timeDate?: string;
}

export interface AssigneeNode extends FlowNode {
  // 审批方式
  assigneeType:
    | 'user'
    | 'role'
    | 'choice'
    | 'self'
    | 'leader'
    | 'orgLeader'
    | 'formUser'
    | 'formRole'
    | 'autoRefuse';
  // 审批人
  users: string[];
  // 审批角色
  roles: string[];
  // 表单内人员
  formUser: string;
  // 表单内角色
  formRole: string;
  // 主管
  leader: number;
  // 组织主管
  orgLeader: number;
  // 自选：true-多选，false-单选
  choice: boolean;
  // 发起人自己
  self: boolean;
}

export interface OperationPermissions {
  // 同意
  complete: boolean;
  // 拒绝
  refuse: boolean;
  // 回退
  back: boolean;
  // 转交
  transfer: boolean;
  // 委派
  delegate: boolean;
  // 加签
  addMulti?: boolean;
  // 减签
  minusMulti?: boolean;
}

export interface ApprovalNode extends AssigneeNode {
  // 多人审批方式
  multi: 'sequential' | 'joint' | 'single';
  // 审批人为空时处理方式：reject-拒绝，pass-通过，admin-管理员，assign-指定人员
  nobody: 'refuse' | 'pass' | 'admin' | 'assign';
  // 多人审批通过比例
  multiPercent: number;
  // 审批人为空时,指定人员
  nobodyUsers: string[];
  // 表单字段
  formProperties: FormProperty[];
  // 操作权限
  operations: OperationPermissions;
  // 任务监听器
  taskListeners?: NodeListener[];
}
export interface ErrorInfo {
  id: string;
  name: string;
  message: string;
}

export interface Field {
  id: string;
  type: 'formItem' | 'container';
  label: string;
  name: string;
  value: any;
  readonly?: boolean;
  required?: boolean;
  hidden: boolean;
  props: Recordable;
  children?: Field[];
}

/**
 * 字段筛选结果
 */
export interface Condition {
  // 筛选字段
  field: string | null;
  // 条件运算符
  operator: string;
  // 筛选值
  value: any | null;
}

/**
 * 筛选规则
 */
export interface FilterRules {
  operator: 'or' | 'and';
  conditions: Condition[];
  groups: FilterRules[];
}

export interface ConditionNode extends FlowNode {
  def: boolean;
  conditions: FilterRules;
}
export interface EndNode extends FlowNode {}
