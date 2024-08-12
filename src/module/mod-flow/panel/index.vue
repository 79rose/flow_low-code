<template>
    <div>
        <!-- panel list currentPanel.includes('flow') -->
    </div>
</template>

<script setup lang="ts">
    import { usePanel } from 'hooks/usePanel'
    const { currentPanel } = usePanel()

    const isShow = (name: string) => {
        return currentPanel.includes(name) !== -1
    }
</script>

<style scoped></style>