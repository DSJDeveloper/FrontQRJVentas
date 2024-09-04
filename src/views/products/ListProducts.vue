<template>
  <BaseList title="Listado de SKU" api="SKU" :headers="_headers" :readonly="true" :customstatus="false" :view-detail="false">
    <template v-slot:[`item.Price`]="{ value }">
      {{ Number(value).toLocaleString() }}
    </template>
    <template v-slot:[`item.TaxPercentage`]="{ value }">
      {{ value }} %
    </template>
    
  </BaseList>
</template>

<script setup lang="ts">
import BaseList from '@/components/shared/BaseList.vue';

const _headers: any = [
  { title: 'Código', key: 'ResourceCode', align: 'start', width: 120 },
  { title: 'Nombre', key: 'Name', align: 'start' },
  { title: 'Presentación', key: 'PresentationName', align: 'start', width: 50 },
  { title: 'Impuesto', key: 'TaxPercentage', align: 'start', width: 20 },
  { title: 'Precio', key: 'Price', align: 'end', width: 30 },
  { title: 'Estatus', key: 'Status', align: 'start', width: 110 },
  { title: 'Id', key: 'Id', align: ' d-none' }
];
</script>

<style scoped>
</style>