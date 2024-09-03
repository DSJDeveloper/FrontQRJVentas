<template>
  
    <BaseList title="Listado de Vendedores" api="Sellers" :headers="_headers" :readonly="true" />
  
</template>

<script setup lang="ts">
import BaseList from '@/components/shared/BaseList.vue';


const _headers: any = [
  { title: 'Código', key: 'Code', align: 'start',width:120 },
  { title: 'Nombre', key: 'Description', align: 'start' },
  { title: 'Email', key: 'UserAccount', align: 'start' },
  { title: 'Estatus', key: 'Status', align: 'start', width:110 },
  { title: 'Id', key: 'Id',align:' d-none' }
];

</script>

<style scoped>
</style>