<template>
  
  <BaseList title="Listado de Clientes" api="Client" :headers="_headers"  :readonly="true"  />

</template>

<script setup lang="ts">
import BaseList from '@/components/shared/BaseList.vue';

const _headers: any = [
  { title: 'RIF', key: 'CustomerID', align: 'start',width:120 },
  { title: 'Rason Social', key: 'BusinessName', align: 'start' },
  { title: 'Razón Comercial', key: 'CommercialReason', align: 'start' },
  { title: 'Estatus', key: 'Status', align: 'start', width:110 },
  { title: 'Id', key: 'Id',align:' d-none' }
];

</script>

<style scoped>
</style>
<!-- <template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users-group" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
  <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M17 10h2a2 2 0 0 1 2 2v1" />
  <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
  <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
</svg></v-icon>Lista de Clientes
      <v-spacer></v-spacer>

      <v-text-field v-model="search" density="compact" label="Buscar" variant="solo-filled" flat hide-details single-line></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="data"
      :items-length="totalrows"
      :loading="loading"
      :search="search"
      :fixed-footer="true"
      item-value="id"
      @update:options="loadItems"
      items-per-page-text="Registros por página"
      loading-text="Cargando...."
    >
    </v-data-table-server>
  </v-card>
</template>
  
  <script setup lang="ts">
import BaseApiServices from '@/services/BaseApiServices';
import { ref } from 'vue';

let data = ref([]);
let loading = ref(true);

let itemsPerPage: number = ref(10);
let totalrows: number = ref(0);
let search: string = ref('');

let headers: any = ref([
  { title: 'RIF', key: 'CustomerID', align: 'start',width:120 },
  { title: 'Rason Social', key: 'BusinessName', align: 'start' },
  { title: 'Razón Comercial', key: 'CommercialReason', align: 'start' },
  { title: 'Estatus', key: 'Status', align: 'start' },
  { title: 'Id', key: 'Id',align:' d-none' }
]);

const loadItems = async (params: any) => {
  try {
    loading.value = true;
    const apiuser = new BaseApiServices('Client');
    await apiuser.getAll(null, params?.sortBy, params?.search, params?.itemsPerPage, params?.page);
    const pagination = apiuser.getPagination();
    data.value = apiuser.getData();
    totalrows.value = pagination.totalrows;
    loading.value = false;
  } catch (error) {
    alert(error);
  }
};
</script>
  
  <style lang="scss" scoped>
</style> -->