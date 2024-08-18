<script setup lang="ts" name="TreeNode">
    import type { FlowNode } from './type'
    import Start from './StartNode.vue'

    defineProps<{
        node: FlowNode
    }>()
    const nodes: Recordable<Component> = {
        start: Start
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
