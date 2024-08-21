<script setup lang="ts">
    import Node from './Node.vue'
    import type { CcNode, ErrorInfo } from './type'


    const props = defineProps<{
        node: CcNode
    }>()
    const { nodesError } = inject<{
        nodesError: Ref<Recordable<ErrorInfo[]>>
    }>('flowDesign', { nodesError: ref({}) })
    const content = ref<string>('')
    onMounted(() => {
        console.group('CcNode mounted')
        console.log(props.node)
        console.log(nodesError.value)
        console.groupEnd()
    })
</script>

<template>
    <Node v-bind="$attrs" icon="Promotion" color="rgb(50, 150, 250)" :node="node">
        <el-text>{{ content }}</el-text>
    </Node>
</template>

<style scoped lang="scss"></style>
