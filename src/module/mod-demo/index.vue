<script setup lang="ts">
    import FlowDesign from '../mod-flow/index'
    import { useModel } from 'hooks/useModel';

    import { useDataStore } from 'store/modules/data'

    const { fields, process } = useDataStore();
    const { readOnly } = useModel();


</script>

<template>
    <div class="h-90vh">
        <FlowDesign :process="process" :readOnly="readOnly" :fields="fields" />
    </div>
</template>
