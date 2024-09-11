<template>
    <div>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="tableHeaders" :items="_model.CurrencyRates" height="400"
            density="compact" :items-length="totalItems" :loading="loading">
            <template v-slot:[`item.PurchaseRate`]="{ value }">
                <i18n-n :value="value"></i18n-n>
            </template>
            <template v-slot:[`item.SellingRate`]="{ value }">
                <i18n-n :value="value"></i18n-n>
            </template>
            <template v-slot:[`item.TotalAmount`]="{ value }">
                <i18n-n :value="value"></i18n-n>
            </template>
            
    <template v-slot:[`item.EffectiveDate`]="{ value }">
      <i18n-d format="short" :value="value"></i18n-d>
    </template>
        </v-data-table>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

let _model: any = ref({})
let itemsPerPage = 10;
const tableHeaders: any = [
    { title: 'Descripción', key: 'Description', align: 'start' },
    {title: 'Compra', key: 'PurchaseRate', align: 'end'},
    {title: 'Venta', key: 'SellingRate', align: 'end'},
    { title: 'Fecha Vigencia', key: 'EffectiveDate', align: 'start' },
    

];

let loading = ref(false);
let totalItems = ref(0);

let props = defineProps<{
    model: any
}>();
onBeforeMount(() => {
    _model = props.model


});
</script>

<style scoped>

</style>