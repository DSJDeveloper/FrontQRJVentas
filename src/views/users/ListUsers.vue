<template>
  
  <BaseList title="Listado de Usuarios" api="Users" :headers="_headers" :view-detail="false"  />

</template>

<script setup lang="ts">
import BaseList from '@/components/shared/BaseList.vue';

const _headers: any = [
  { title: 'Usuario', key: 'Name', align: 'start' },
  { title: 'E-mail', key: 'Email', align: 'start' },
  { title: 'Estatus', key: 'Status', align: 'start', width:110 },
  { title: 'Id', key: 'Id',align:' d-none' }
];

</script>

<style scoped>
</style>
