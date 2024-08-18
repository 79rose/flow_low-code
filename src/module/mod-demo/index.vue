<script setup lang="ts">
    import FlowDesign from '../mod-flow/index'
    import type { FlowNode, StartNode } from '../mod-flow/node/type'

    // 流程节点
    const process = ref<FlowNode>({
        id: 'root',
        pid: undefined,
        type: 'start',
        name: '发起人',
        executionListeners: [],
        formProperties: [],
    } as StartNode)

    // 是否只读
    const readOnly = ref(false)
</script>

<template>
    <div>

        <FlowDesign :process="process" :readOnly="readOnly" />
    </div>
</template>
