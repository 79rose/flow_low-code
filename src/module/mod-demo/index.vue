<script setup lang="ts">
    import FlowDesign from '../mod-flow/index'
    import { useModel } from 'hooks/useModel';

    import { useDataStore } from 'store/modules/data'

    const { fields, process } = useDataStore();
    const { readOnly } = useModel();
    // 流程节点


</script>

<template>
    <div class="h-90vh">
        <FlowDesign :process="process" :readOnly="readOnly" :fields="fields" />
    </div>
</template>
