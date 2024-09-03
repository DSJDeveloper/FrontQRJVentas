<template>
  
  <BaseList title="Listado de Usuarios" api="Users" :headers="_headers"  />

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
<!-- <template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#597e8d" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
  <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
</svg></v-icon>Lista de Usuarios
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
      item-value="id"
      @update:options="loadItems"
      
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
// let name: string = ref('');
// let email: string = ref('');
let headers: any = ref([
  { title: 'Usuario', key: 'Name', align: 'start' },
  { title: 'E-mail', key: 'Email', align: 'start' },
  { title: 'Estatus', key: 'Status', align: 'start' },
  { title: 'Id', key: 'Id' }
]);

const loadItems = async (params:any ) => {
  try {
    loading.value = true;
    const apiuser = new BaseApiServices('Users');
    await apiuser.getAll(null,params?.sortBy,params?.search,params?.itemsPerPage,params?.page);
    const _items =  apiuser.getData();
    data.value =_items;
    loading.value = false;
    
  } catch (error) {
    alert(error);
  }
};
</script>

<style lang="scss" scoped>
</style> -->