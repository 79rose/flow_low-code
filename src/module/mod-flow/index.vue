<template>
    <div class="designer-container cursor-default active:cursor-grabbing" ref="designerContainerRef">
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
    import TreeNode from './node/TreeNode.vue'
    import type { FlowNode, NodeType } from './node/type'
    import { NODETYPE } from 'const/node'
    const props = withDefaults(
        defineProps<{
            process: FlowNode
            // fields: Field[]
            readOnly?: boolean
            defaultZoom?: number
            bgColor?: string
        }>(),
        {
            readOnly: false,
            defaultZoom: 100,
            bgColor: 'var(--el-bg-color-page)'
        }
    )
    const zoom = ref(100)
    const activeData = ref<FlowNode>({
        id: '',
        name: '',
        type: NODETYPE.START
    })
    const penalVisible = ref(false)
    const getScale = computed(() => zoom.value / 100)
    const addNode = (type: NodeType, node: FlowNode) => {
        console.log(type, node)
    }
    const delNode = (node: FlowNode) => {
        console.log(node)
    }
    const openPenal = (node: FlowNode) => {
        activeData.value = node
        penalVisible.value = true
    }

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