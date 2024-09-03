<template>
    <form>
        <v-row>
            <v-col cols="12" md="2">
                <v-text-field v-model="_model.RIFClient" autofocus readonly label="RIF Cliente"
                    hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
                <v-text-field v-model="_model.CodeExternalClient" readonly label="Código" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field v-model="_model.Client" readonly label="Cliente" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
                <v-text-field v-model="_model.DateOrder" readonly label="Fecha" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.FiscalAddress" readonly label="Dirección" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="2">
                <v-text-field v-model="_model.CodeSeller" readonly label="Vendedor" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="9">
                <v-text-field v-model="_model.Observation" readonly label="Observación" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="1">
                <div class="text-center">
                    <v-chip :color="_model.Status == 2 ? 'success' : _model.Status == 1 ? 'warning' : 'accent'"
                        :text="_model.Status == 2 ? 'Sincronizado' : _model.Status == 1 ? 'No Sincronizado' : 'Anulado'"
                        class="text-uppercase" size="small" label></v-chip>
                </div>
            </v-col>
        </v-row>

    </form>
    <div>
        <v-data-table v-model:items-per-page="itemsPerPage" :headers="tableHeaders" :items="_model.Items" height="400"
            density="compact" :items-length="totalItems" :loading="loading" item-value="CodeSKU">
            <template v-slot:[`item.TaxAmount`]="{ value }">
                <i18n-n :value="value"></i18n-n>
            </template>
            <template v-slot:[`item.NetAmount`]="{ value }">
                <i18n-n :value="value"></i18n-n>
            </template>
            <template v-slot:[`item.TotalAmount`]="{ value }">
                <i18n-n :value="value"></i18n-n>
            </template>
        </v-data-table>
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { defineProps, onBeforeMount, ref,type Ref } from 'vue'
let _model: any = ref({})
let itemsPerPage = 10;
const tableHeaders:any = [
    {
        title: 'Código',
        align: 'start',
        key: 'CodeSKU',
    },
    { title: 'Nombre', key: 'NameSKU', align: 'start' },
    { title: 'Cantidad', key: 'QuantityDispatched', align: 'end' },
    { title: 'Total Base', key: 'TaxAmount', align: 'end', },
    { title: 'Total Impuestos', key: 'NetAmount', align: 'end' },
    {
        title: 'Total', key: 'TotalAmount', align: 'end',
        value: (item:any) => (item.TaxAmount + item.NetAmount)
    },


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

<style scoped></style>