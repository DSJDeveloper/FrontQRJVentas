<template>

    <BaseList title="Listado de WorkSpaces" api="Company" endpointget="getListCompanys" :show-pagination="false"
        :can-delete="false" :can-edit="true" key-field="Id" :headers="_headers" :view-detail="false"
        v-on:item-add="addrow" v-on:item-edit="editrow">

    </BaseList>
    <BaseCardForm :dialog="dialogform" @update:dialog-close="dialogform = false" :model="model" :title="title">
        <template #content>
            <FormWorkSpaces :model="model" :new-row="newrow" />
        </template>

    </BaseCardForm>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import BaseList from '@/components/shared/BaseList.vue';
import BaseCardForm from '@/components/shared/BaseCardForm.vue';
import FormWorkSpaces from './FormWorkSpaces.vue';

let dialogform = ref(false)
let title: string = ""
let model: any = ref({})
let newrow: boolean = false
const _headers: any = [
    { title: 'Código', key: 'Code', align: 'start', width: 110 },
    { title: 'Espacio de Trabajo', key: 'WorkSpace', align: 'start' },
    { title: 'Empresa', key: 'NameCompany', align: 'start' },
    { title: 'Id', key: '_idcompany', align: ' d-none' }
];
const addrow = () => {
    title = "Nuevo WorkSpaces";
    model.value = {
        IdPlan: "free",
        WorkSpace: "",
        LogoBusiness: "",
        name: "",
        email: ""
    };
    newrow = true
    dialogform.value = true;
}
const editrow = (row: any) => {
    title = "WorkSpaces";
    model.value = row;
    newrow = false
    dialogform.value = true;
}
</script>

<style scoped></style>