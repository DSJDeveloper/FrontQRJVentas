<template>
  <BaseList title="Listado de Pedidos" api="Orders" :headers="_headers" :readonly="true" :customstatus="true"
    :viewdetail=true v-on:item-view="viewdetail">
    <template v-slot:[`item.NetAmount`]="{ value }">
      <i18n-n :value="value"></i18n-n>
    </template>
    <template v-slot:[`item.TaxAmount`]="{ value }">
      <i18n-n :value="value"></i18n-n>
    </template>
    <template v-slot:[`item.Total`]="{ value }">
      <i18n-n :value="value" />
    </template>

    <template v-slot:[`item.DateOrder`]="{ value }">
      <i18n-d format="short" :value="value"></i18n-d>
    </template>

    <template v-slot:[`item.Status`]="{ value }">
      <div class="text-start">
        <v-chip :color="value == 2 ? 'success' : value == 1 ? 'warning' : 'accent'"
          :text="value == 2 ? 'Sincronizado' : value == 1 ? 'No Sincronizado' : 'Anulado'" class="text-uppercase"
          size="small" label></v-chip>
      </div>
    </template>
  </BaseList>
  <BaseCardForm v-model="dialogdetail" :model="model" :title="title">
    <template #content>
      <DetailOrders :model="model" />
    </template>

  </BaseCardForm>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseList from '@/components/shared/BaseList.vue';
import BaseCardForm from '@/components/shared/BaseCardForm.vue';
import DetailOrders from './DetailOrders.vue';
let dialogdetail = ref(false);
let model: any = ref({})
let title:string=''
const _headers: any = [
  { title: '# Pedido', key: 'NroOrder', align: 'start', width: 120 },
  { title: 'RIF', key: 'RIFClient', align: 'start', width: 120 },
  { title: 'Cliente', key: 'Client', align: 'start' },
  { title: 'Fecha', key: 'DateOrder', align: 'start', width: 100 },
  { title: 'Código Vendedor', key: 'CodeSeller', align: 'center', width: 10 },
  { title: 'Observación', key: 'Observation', align: 'start', width: 20 },
  { title: 'Sub Total', key: 'NetAmount', align: 'end', width: 100 },
  { title: 'Impuesto', key: 'TaxAmount', align: 'end', width: 100 },
  { title: 'Total', key: 'Total', align: 'end', width: 100 },
  { title: 'Estatus', key: 'Status', align: 'start', width: 110 },
  { title: 'Id', key: 'Id', align: ' d-none' }
];

const viewdetail = (row: any) => {
  console.log(row);
  dialogdetail.value = true
  model.value = row
  title=`Pedido # ${row.NroOrder}`;
}
</script>

<style scoped></style>