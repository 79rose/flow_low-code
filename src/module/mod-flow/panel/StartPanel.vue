<script setup lang="ts">
    import type { FormProperty, StartNode } from '../node/type'
    const props = defineProps<{
        activeData: StartNode
    }>()
    const activeName = ref('basicSettings')
    const allReadonly = computed({
        get() {
            return props.activeData.formProperties.every((e) => e.readonly)
        },
        set(val) {
            props.activeData.formProperties.forEach((e) => (e.readonly = val))
            if (val) {
                allHidden.value = false
                allRequired.value = false
            }
        }
    })
    const allHidden = computed({
        get() {
            return props.activeData.formProperties.every((e) => e.hidden)
        },
        set(val) {
            props.activeData.formProperties.forEach((e) => (e.hidden = val))
            if (val) {
                allRequired.value = false
                allReadonly.value = false
            }
        }
    })
    const allRequired = computed({
        get() {
            return props.activeData.formProperties.every((e) => e.required)
        },
        set(val) {
            props.activeData.formProperties.forEach((e) => (e.required = val))
            if (val) {
                allReadonly.value = false
                allHidden.value = false
            }
        }
    })

    const changeReadonly = (row: FormProperty) => {
        if (row.readonly) {
            row.required = false
            row.hidden = false
        }
    }
    const changeRequired = (row: FormProperty) => {
        if (row.required) {
            row.readonly = false
            row.hidden = false
        }
    }
    const changeHidden = (row: FormProperty) => {
        if (row.hidden) {
            row.readonly = false
            row.required = false
        }
    }

</script>

<template>
    <el-tabs v-model="activeName" stretch class="el-segmented">
        <el-tab-pane :label="$t('common.baseSetting')" name="basicSettings">
            <el-form label-position="top" label-width="90px">
                <el-form-item prop="executionListeners" label="执行监听器">
                    <!-- <ExecutionListeners :node="activeData" /> -->
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane :label="$t('form.permissions')" name="formPermissions">
            <el-table :data="activeData.formProperties">
                <el-table-column prop="name" :label="$t('form.field')" />
                <el-table-column prop="readonly">
                    <template #header>
                        <el-checkbox v-model="allReadonly" :label="$t('form.readonly')" />
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.readonly" @change="changeReadonly(row)" />
                    </template>
                </el-table-column>
                <el-table-column prop="required">
                    <template #header>
                        <el-checkbox v-model="allRequired" :label="$t('form.required')" />
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.required" @change="changeRequired(row)" />
                    </template>
                </el-table-column>
                <el-table-column prop="hidden">
                    <template #header>
                        <el-checkbox v-model="allHidden" :label="$t('form.hidden')" />
                    </template>
                    <template #default="{ row }">
                        <el-checkbox v-model="row.hidden" @change="changeHidden(row)" />
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped>
    @import 'styles/el-segmented.scss';
</style>
