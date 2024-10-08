<script setup lang="ts">
    import Node from './Node.vue'
    import type { ApprovalNode, ErrorInfo, Field } from './type'
    import { getById } from '@/api/modules/role'
    import { getByUsername } from '@/api/modules/user'
    const { nodesError } = inject<{
        fields: Ref<Field[]>
        nodesError: Ref<Recordable<ErrorInfo[]>>
    }>('flowDesign', { fields: ref([]), nodesError: ref({}) })
    const props = defineProps<{
        node: ApprovalNode
    }>()
    const content = ref<string>('')
    watchEffect(() => {
        const errors: ErrorInfo[] = []
        const {
            id,
            name,
            assigneeType,
            nobody,
            nobodyUsers,
            choice,
            formUser,
            formRole,
            leader,
            orgLeader,
            users,
            roles
        } = props.node
        if (assigneeType === 'user') {
            if (users.length > 0) {
                const all = users.map((user) => getByUsername(user))
                Promise.all(all).then((users) => {
                    content.value = users.map((user) => user.data.name).join('、')
                })
            } else {
                errors.push({ id: id, name: name, message: '未指定人员' })
                content.value = '未指定人员'
            }
        } else if (assigneeType === 'choice') {
            content.value = `发起人自选（${choice ? '多选' : '单选'}）`
        } else if (assigneeType === 'self') {
            content.value = '发起人自己'
        } else if (assigneeType === 'leader') {
            content.value = leader === 1 ? '直属上级' : `${leader}级上级`
        } else if (assigneeType === 'orgLeader') {
            content.value = orgLeader === 1 ? '直属主管' : `${orgLeader}级主管`
        } else if (assigneeType === 'formUser') {
            if (!formUser) {
                errors.push({ id: id, name: name, message: '未指定表单内人员' })
            }
            const title = fields.value.find((e) => e.id === formUser)?.label || formUser || '?'
            content.value = `表单内（${title}）人员`
        } else if (assigneeType === 'formRole') {
            if (!formRole) {
                errors.push({ id: id, name: name, message: '未指定表单内角色' })
            }
            const title = fields.value.find((e) => e.id === formRole)?.label || formRole || '?'
            content.value = `表单内（${title}）角色`
        } else if (assigneeType === 'role') {
            if (roles.length > 0) {
                const all = roles.map((id) => getById(id))
                Promise.all(all).then((roles) => {
                    content.value = roles.map((res) => res.data.name).join('、')
                })
            } else {
                errors.push({ id: id, name: name, message: '未指定角色' })
                content.value = '未指定角色'
            }
        } else if (assigneeType === 'autoRefuse') {
            content.value = '系统自动拒绝'
        } else {
            errors.push({ id: id, name: name, message: '未知错误' })
            content.value = name
        }
        if (nobody === 'assign') {
            if (!nobodyUsers || nobodyUsers.length === 0) {
                errors.push({ id: id, name: name, message: '未指定审批人为空时的处理人' })
            }
        }

        // 记录错误
        if (errors.length > 0) {
            nodesError.value[id] = errors
        } else {
            delete nodesError.value[id]
        }
    })
</script>

<template>
    <Node v-bind="$attrs" icon="Stamp" color="linear-gradient(89.96deg, #FA6F32 .05%, #FB9337 79.83%)" :node="node">
        <el-text>{{ content }}</el-text>
    </Node>
</template>

<style scoped lang="scss"></style>
