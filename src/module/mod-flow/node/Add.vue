<script setup lang="ts">
    import type { PopoverInstance } from 'element-plus'
    import type { NodeType } from './type'

    const { readOnly } = inject<{
        readOnly?: Ref<boolean>
    }>('flowDesign', { readOnly: ref(false) })
    const popoverRef = ref<PopoverInstance>()
    const $emits = defineEmits<{
        (e: 'addNode', type: NodeType): void
    }>()
    const addNode = (name: NodeType) => {
        $emits('addNode', name)
        popoverRef.value?.hide()
    }
</script>

<template>
    <div class="add-but">
        <el-popover placement="bottom-start" ref="popoverRef" trigger="click" title="添加节点" :width="336">
            <el-space wrap>
                <div class="node-select" @click="() =>
                    addNode('approval')
                    ">
                    <el-icon>
                        <Stamp class="Stamp" />
                    </el-icon>
                    <el-text>审批人</el-text>
                </div>
                <div class="node-select" @click="() =>
                    addNode('cc')
                    ">
                    <el-icon>
                        <Promotion class="Promotion" />
                    </el-icon>
                    <el-text>抄送人</el-text>
                </div>
                <div class="node-select" @click="() =>
                    addNode('exclusive')
                    ">
                    <el-icon>
                        <Share class="Share" />
                    </el-icon>
                    <el-text>互斥分支</el-text>
                </div>
                <div class="node-select" @click="() =>
                    addNode('timer')
                    ">
                    <el-icon>
                        <Timer class="Timer" />
                    </el-icon>
                    <el-text>计时等待</el-text>
                </div>
                <div class="node-select" @click="() =>
                    addNode('notify')
                    ">
                    <el-icon>
                        <BellFilled class="BellFilled" />
                    </el-icon>
                    <el-text>消息通知</el-text>
                </div>
            </el-space>
            <template #reference>
                <el-button v-show="!readOnly" icon="Plus" type="primary" style="z-index: 1" circle></el-button>
            </template>
        </el-popover>
    </div>
</template>

<style scoped lang="scss">
    .node-select {
        cursor: pointer;
        display: flex;
        padding: 8px;
        width: 135px;
        border-radius: 10px;
        position: relative;
        background-color: var(--el-fill-color-light);

        &:hover {
            background-color: var(--el-color-primary-light-9);
            box-shadow: var(--el-box-shadow-light);
            color: var(--el-color-primary);
        }

        .el-icon {
            font-size: 25px;
            padding: 5px;
            border-radius: 50%;
            color: var(--el-color-white);

            &.Stamp {
                background-color: #ff943e;
            }

            &.Promotion {
                background-color: #3296fa;
            }

            &.Share {
                background-color: #45cf9b;
            }

            &.Timer {
                background-color: #e872b7;
            }

            &.BellFilled {
                background-color: #95d475;
            }
        }

        .el-text {
            margin-left: 10px;
        }
    }

    .add-but {
        display: flex;
        justify-content: center;
        width: 100%;
        padding: 20px 0 32px;
        position: relative;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 1px;
            height: 100%;
            background-color: var(--el-border-color);
        }
    }
</style>
