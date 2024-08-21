<script setup lang="ts">
    import Node from './Node.vue'
    import type { NotifyNode, ErrorInfo } from './type'

    const props = defineProps<{
        node: NotifyNode
    }>()
    const { nodesError } = inject<{
        nodesError: Ref<Recordable<ErrorInfo[]>>
    }>('flowDesign', { nodesError: ref({}) })
    const content = ref<string>('')
    onMounted(() => {
        console.group('NotifyNode mounted')
        console.log(props.node)
        console.log(nodesError.value)
        console.groupEnd()
    })

</script>

<template>
    <Node v-bind="$attrs" icon="BellFilled" color="#95d475" :node="node">
        <el-text>{{ content }}</el-text>
    </Node>
</template>

<style scoped lang="scss"></style>
