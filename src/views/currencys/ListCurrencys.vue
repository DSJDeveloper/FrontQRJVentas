<template>

    <BaseList title="Listado de Monedas" api="Currency" :headers="_headers" :readonly="true" :view-detail="true"
    v-on:item-view="viewdetail"
     />
    <BaseCardForm :dialog="dialogdetail" @update:dialog-close="dialogdetail = false" :readonly="true" :model="model"
        :title="title">
        <template #content>
            <DetailCurrency :model="model" />

        </template>

    </BaseCardForm>


</template>

<script setup lang="ts">
import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import { ref } from 'vue';
import DetailCurrency from './DetailCurrency.vue';
let dialogdetail = ref(false);
let model: any = ref({});
let title = '';
const _headers: any = [
    { title: 'Código', key: 'CurrencyCode', align: 'start', width: 120 },
    { title: 'Descripción', key: 'Description', align: 'start' },
    { title: 'Simbolo', key: 'CurrencySymbol', align: 'start', width: 120 },
    { title: 'Estatus', key: 'Status', align: 'start', width: 110 },
    { title: 'Id', key: 'Id', align: ' d-none' }
];
const viewdetail = (row: any) => {
    dialogdetail.value = true
    model.value = row
    title = `Moneda # ${row.Descripción}`;
}
</script>

<style scoped></style>