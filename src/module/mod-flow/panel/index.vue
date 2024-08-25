<script setup lang="ts">
    import { ClickOutside as vClickOutside } from 'element-plus'
    import Start from './StartPanel.vue'
    import Approval from './ApprovalPanel.vue'
    import type { FlowNode } from '../node/type'
    import CcPanel from './CcPanel.vue';
    import Timer from './TimerPanel.vue'
    import Notify from './NotifyPanel.vue'
    import Condition from './ConditionPanel.vue'
    defineProps<{
        activeData: FlowNode
    }>()
    const penalVisible = defineModel<boolean>({ required: true })
    const panels: Recordable<Component> = {
        start: Start,
        approval: Approval,
        cc: CcPanel,
        timer: Timer,
        notify: Notify,
        condition: Condition
    }
    const showInput = ref(false)
    const onClickOutside = () => {
        if (showInput.value) {
            showInput.value = false
        }
    }
</script>

<template>
    <el-drawer v-model="penalVisible" size="35%">
        <template #header="{ titleId, titleClass }">
            <span :id="titleId" :class="titleClass">
                <el-input v-click-outside="onClickOutside" @blur="onClickOutside" maxlength="30"
                    v-model="activeData.name" v-show="showInput"></el-input>
                <el-link icon="EditPen" v-show="!showInput" @click="showInput = true">
                    {{ activeData?.name || $t('form.nodeSetting') }}
                </el-link>
            </span>
        </template>
        <component :is="panels[activeData.type]" :activeData="activeData" />
    </el-drawer>
</template>

<style scoped lang="scss">
    :deep(.el-tabs__content) {
        margin-top: 10px;
    }
</style>
