<script setup lang="ts">
    import Node from './Node.vue'
    import type { ApprovalNode, ErrorInfo } from './type'

    const { nodesError } = inject<{
        // fields: Ref<Field[]>
        nodesError: Ref<Recordable<ErrorInfo[]>>
    }>('flowDesign', { nodesError: ref({}) })
    const props = defineProps<{
        node: ApprovalNode
    }>()
    const content = ref<string>('')
    onMounted(() => {
        console.group('ApprovalNode mounted')
        console.log(props.node)
        console.log(nodesError.value)
        console.groupEnd()
    })
</script>

<template>
    <Node v-bind="$attrs" icon="Stamp" color="linear-gradient(89.96deg, #FA6F32 .05%, #FB9337 79.83%)" :node="node">
        <el-text>{{ content }}</el-text>
    </Node>
</template>

<style scoped lang="scss"></style>
