<script setup lang="ts" name="TreeNode">
    import type { FlowNode } from './type'
    import Start from './StartNode.vue'
    import Approval from './ApprovalNode.vue'
    import End from './EndNode.vue'
    import Cc from './CcNode.vue'
    import Timer from './TimerNode.vue'
    import Notify from './NotifyNode.vue'
    import Exclusive from './ExclusiveNode.vue'
    import Condition from './ConditionNode.vue'

    defineProps<{
        node: FlowNode
    }>()
    const nodes: Recordable<Component> = {
        start: Start, //开始
        approval: Approval, //
        cc: Cc, //抄送
        timer: Timer, //定时
        notify: Notify, //通知
        exclusive: Exclusive, //排他
        condition: Condition, //条件
        end: End //结束
    }
</script>

<template>
    <slot />
    <component :is="nodes[node.type]" :node="node" v-bind="$attrs">
        <template v-for="(_, name) in $slots" #[name]="scope">
            <slot :name="name" v-bind="scope || {}"></slot>
        </template>
    </component>
    <TreeNode v-if="node.child" :node="node.child" v-bind="$attrs" />
</template>
