<template>
    <div>
        <el-drawer v-model="isOpen" size="35%">
            <PanelList />
        </el-drawer>
        <slot />
    </div>
</template>

<script setup lang="ts">
    // some provider like drawer, dialog, message, notification
    import PanelList from 'module/mod-flow/panel/index.vue'
    import { usePanel } from 'hooks/usePanel'
    const { isOpen } = usePanel()
</script>

<style scoped></style>