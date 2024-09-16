<template>

  <BaseList title="Listado de Vendedores" api="Sellers" :headers="_headers" :readonly="true" :view-detail="true"
    v-on:item-view="viewdetail">
  </BaseList>
  <BaseCardForm :dialog="dialogdetail" @update:dialog-close="dialogdetail = false"  :readonly="true" :model="model"
    :title="title">
    <template #content>
      <DetailSellers :model="model" />

    </template>

  </BaseCardForm>

</template>

<script setup lang="ts">
import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import { ref } from "vue"
import DetailSellers from './DetailSellers.vue';
let dialogdetail = ref(false);
let model: any = ref({});
let title = '';
const _headers: any = [
  { title: 'Código', key: 'Code', align: 'start', width: 120 },
  { title: 'Nombre', key: 'Description', align: 'start' },
  { title: 'Email', key: 'UserAccount', align: 'start' },

  { title: 'Estatus', key: 'Status', align: 'start', width: 110 },
  { title: 'Id', key: 'Id', align: ' d-none' }
];
const viewdetail = (row: any) => {
  dialogdetail.value = true
  model.value = row
  title = `Vendedor # ${row.Description}`;
}
</script>

<style scoped></style>