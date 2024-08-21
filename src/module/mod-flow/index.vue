<template>
    <div class="designer-container cursor-default active:cursor-grabbing" ref="designerContainerRef"
        :class="{ 'cursor-grabbing': !cursorDefault }">
        >
        <div class="zoom">
            <el-tooltip :content="$t('flow.tool.zoomIn')" placement="bottom-start">
                <el-button icon="plus" @click="zoom += 10" :disabled="zoom >= 170" circle></el-button>
            </el-tooltip>
            <span>{{ zoom }}%</span>
            <el-tooltip :content="$t('flow.tool.zoomOut')" placement="bottom-start">
                <el-button icon="minus" @click="zoom -= 10" circle :disabled="zoom <= 50"></el-button>
            </el-tooltip>
        </div>
        <!--流程树-->
        <div class="node-container">
            <TreeNode :node="process" @addNode="addNode" @delNode="delNode" @activeNode="openPenal" />
        </div>
        <!--属性面板-->
        <Panel v-model="penalVisible" :active-data="activeData" />
    </div>
</template>

<script setup lang="ts">
    import TreeNode from './node/TreeNode.vue';
    import { useDraggableScroll } from 'hooks/useDraggableScroll'
    import { useWheelMounted } from 'hooks/useWheelMounted'

    import type { ApprovalNode, BranchNode, CcNode, ConditionNode, ErrorInfo, ExclusiveNode, Field, FilterRules, FlowNode, NodeType, NotifyNode, TimerNode } from './node/type';
    import { NODETYPE } from 'const/node';
    const props = withDefaults(
        defineProps<{
            process: FlowNode
            fields: Field[]
            readOnly?: boolean
            defaultZoom?: number
            bgColor?: string
        }>(),
        {
            readOnly: false,
            defaultZoom: 100,
            bgColor: 'var(--el-bg-color-page)'
        }
    );

    const cursorDefault = ref(true);
    const zoom = ref(100);
    const activeData = ref<FlowNode>({
        id: '',
        name: '',
        type: NODETYPE.START
    });
    const penalVisible = ref(false);
    const getScale = computed(() => zoom.value / 100);
    const readOnly = computed(() => props.readOnly);

    const handleWheelCtrl = (e: WheelEvent) => {
        // 改变鼠标样式 改成手型
        cursorDefault.value = false;
        if (e.deltaY < 0) {
            if (zoom.value >= 170) {
                return;
            }
            zoom.value += 10;
        } else {
            if (zoom.value <= 50) {
                return;
            }
            zoom.value -= 10;
        }
    };
    const handleWheelCtrlEnd = () => {
        console.log('end');
        cursorDefault.value = true;
    }
    useWheelMounted(handleWheelCtrl, handleWheelCtrlEnd);
    const nodesError = ref<Recordable<ErrorInfo[]>>({});
    const flatFields = computed(() => {
        const all: Field[] = [];
        const loop = (children: Field[]) => {
            children.forEach((field) => {
                if (field.type === 'formItem') {
                    all.push(field);
                }
                if (Array.isArray(field.children)) {
                    loop(field.children);
                }
            });
        };
        loop(props.fields);
        return all;
    });

    provide('flowDesign', {
        readOnly: readOnly,
        fields: flatFields,
        nodesError: nodesError
    });
    const designerContainerRef = ref<HTMLElement | null>(null);
    useDraggableScroll(designerContainerRef);
    const nextId = (): string => {
        let id = `node_${Math.random().toString(36).substring(2, 7)}`;
        const findId = (node: FlowNode, id: string): boolean => {
            if (node.id === id) {
                return true;
            }
            if (node.child) {
                return findId(node.child, id);
            }
            if ('children' in node) {
                const branchNode = node as BranchNode;
                if (branchNode.children && branchNode.children.length > 0) {
                    return branchNode.children.some((item) => {
                        return findId(item, id);
                    });
                }
            }
            return false;
        };
        if (findId(props.process, id)) {
            return nextId();
        }
        return id;
    };

    const addApproval = (node: FlowNode) => {
        const child = node.child;
        const id = nextId();
        node.child = {
            id: id,
            pid: node.id,
            type: 'approval',
            name: '审批人',
            executionListeners: [],
            child: child,
            // 属性
            assigneeType: 'user',
            formUser: '',
            formRole: '',
            users: [],
            roles: [],
            leader: 1,
            orgLeader: 1,
            choice: false,
            self: false,
            multi: 'sequential',
            multiPercent: 100,
            nobody: 'pass',
            nobodyUsers: [],
            formProperties: [],
            operations: {
                complete: true,
                refuse: true,
                back: true,
                transfer: true,
                delegate: true,
                addMulti: false,
                minusMulti: false
            }
        } as ApprovalNode;
        if (child) {
            child.pid = id;
        }
    };

    const addNotify = (node: FlowNode) => {
        const child = node.child;
        const id = nextId();
        node.child = {
            id: id,
            pid: node.id,
            name: '消息通知',
            type: 'notify',
            child: child,
            assigneeType: 'user',
            formUser: '',
            formRole: '',
            users: [],
            roles: [],
            leader: 1,
            orgLeader: 1,
            choice: false,
            self: false,
            types: ['site'],
            subject: '',
            content: ''
        } as NotifyNode;
        if (child) {
            child.pid = id;
        }
    };

    const addTimer = (node: FlowNode) => {
        const child = node.child;
        const id = nextId();
        node.child = {
            id: id,
            pid: node.id,
            name: '计时等待',
            type: 'timer',
            child: child,
            waitType: 'duration',
            unit: 'PT%sS',
            duration: 0,
            timeDate: undefined
        } as TimerNode;
        if (child) {
            child.pid = id;
        }
    };

    const addCc = (node: FlowNode) => {
        const child = node.child;
        const id = nextId();
        node.child = {
            id: id,
            pid: node.id,
            type: 'cc',
            name: '抄送人',
            child: child,
            assigneeType: 'user',
            formUser: '',
            formRole: '',
            users: [],
            roles: [],
            leader: 1,
            orgLeader: 1,
            choice: false,
            self: false,
            formProperties: []
        } as CcNode;
        if (child) {
            child.pid = id;
        }
    };

    const addCondition = (node: FlowNode) => {
        const exclusive = node as ExclusiveNode;
        exclusive.children.splice(exclusive.children.length - 1, 0, {
            id: nextId(),
            pid: exclusive.id,
            type: 'condition',
            def: false,
            name: `条件${exclusive.children.length + 1}`,
            conditions: {
                operator: 'and',
                conditions: [],
                groups: []
            } as FilterRules,
            child: undefined
        });
    };

    const addExclusive = (node: FlowNode) => {
        const child = node.child;
        const id = nextId();
        const exclusiveNode = {
            id: id,
            pid: node.id,
            type: 'exclusive',
            name: '独占网关',
            child: child,
            children: []
        } as ExclusiveNode;
        if (child) {
            child.pid = id;
        }
        addCondition(exclusiveNode);
        addCondition(exclusiveNode);
        node.child = exclusiveNode;
        if (exclusiveNode.children.length > 0) {
            const condition = exclusiveNode.children[exclusiveNode.children.length - 1] as ConditionNode;
            condition.def = true;
            condition.name = '默认条件';
        }
    };

    const addNode = (type: NodeType, node: FlowNode) => {
        const addMap: Recordable<(node: FlowNode) => void> = {
            exclusive: addExclusive,
            condition: addCondition,
            cc: addCc,
            timer: addTimer,
            notify: addNotify,
            approval: addApproval
        };
        const fun = addMap[type];
        fun && fun(node);
    };

    const delNode = (del: FlowNode) => {
        delete nodesError.value[del.id];
        delNodeNext(props.process, del);
    };

    const delNodeNext = (next: FlowNode, del: FlowNode) => {
        delete nodesError.value[del.id];
        if (next.id === del.pid) {
            if ('children' in next && next.child?.id !== del.id) {
                const branchNode = next as BranchNode;
                const index = branchNode.children.findIndex((item) => item.id === del.id);
                if (index !== -1) {
                    if (branchNode.children.length <= 2) {
                        delError(branchNode);
                        delNode(branchNode);
                    } else {
                        delError(del);
                        branchNode.children.splice(index, 1);
                    }
                }
            } else {
                if (del.child && del.child.pid) {
                    del.child.pid = next.id;
                }
                next.child = del.child;
            }
        } else {
            if (next.child) {
                delNodeNext(next.child, del);
            }
            if ('children' in next) {
                const nextBranch = next as BranchNode;
                if (nextBranch.children && nextBranch.children.length > 0) {
                    nextBranch.children.forEach((item) => {
                        delNodeNext(item, del);
                    });
                }
            }
        }
    };

    const delError = (node: FlowNode) => {
        delete nodesError.value[node.id];
        if (node.child) {
            delError(node.child);
        }
        if ('children' in node) {
            const branchNode = node as BranchNode;
            if (branchNode.children && branchNode.children.length > 0) {
                branchNode.children.forEach((item) => {
                    delError(item);
                });
            }
        }
    };

    const openPenal = (node: FlowNode) => {
        activeData.value = node;
        penalVisible.value = true;
    };
</script>

<style scoped lang="scss">
    .designer-container {
        --flow-bg-color: v-bind(bgColor);
        position: relative;
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        overflow: auto;
        background-color: var(--flow-bg-color);

        .zoom {
            position: fixed;
            z-index: 999;
            top: 65px;
            right: 30px;

            span {
                margin: 0 10px;
            }
        }

        .node-container {
            margin: 0 auto;
            transform: scale(v-bind(getScale));
            transform-origin: 50% 0 0;
            display: flex;
            align-items: center;
            flex-direction: column;
        }
    }
</style>