<template>

    <BaseList ref="dtableRef" title="Listado de WorkSpaces" api="Company" endpointget="getListCompanys"
        :show-pagination="false" :can-delete="false" :can-edit="true" key-field="_idcompany" :headers="_headers"
        :view-detail="false" v-on:item-add="addrow" v-on:item-edit="editrow">

    </BaseList>
    <BaseCardForm :dialog="dialogform" @update:dialog-close="dialogform = false" @update:save-row="saverow"
        :model="model" :title="title" :width="600">
        <template #content>
            <FormWorkSpaces ref="formRef" :id-row="idrow" :is-new-row="newrow" :model="model" />
        </template>

    </BaseCardForm>

</template>
<script setup lang="ts">
import { ref } from 'vue';


import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import FormWorkSpaces from './FormWorkSpaces.vue';
import type IFormCrud from '@/interfaces/IFormCrud';
const formRef = ref()
const dtableRef = ref()

let dialogform = ref(false)
let title: string = ""
let idrow: string = ""
let model: any
let newrow: boolean = false
const _headers: any = [
    { title: 'Código', key: 'Code', align: 'start', width: 110 },
    { title: 'Espacio de Trabajo', key: 'WorkSpace', align: 'start', width: 300 },
    { title: 'RIF', key: 'IdCompany', align: 'start', width: 130 },
    { title: 'Empresa', key: 'NameCompany', align: 'start' },
    { title: 'Id', key: '_idcompany', align: ' d-none' }
];
const addrow = () => {
    title = "Nuevo WorkSpaces";
    model = {
        IdPlan: "free",
        WorkSpace: "",
        LogoBusiness: "",
        name: "",
        email: ""
    };
    newrow = true
    idrow = ""

    formRef.value?.onNewRow!(true)
    dialogform.value = true;

}
const editrow = async (row: any) => {
    title = "WorkSpaces";

    model = row;
    idrow = model._idcompany
    newrow = false
    dialogform.value = true;
    formRef.value?.onNewRow(false)


}
const saverow = async () => {
    try {
        if (newrow) {
            await formRef.value?.onCreate!()
        } else {
            await formRef.value?.onUpdate!()
        }
        dialogform.value = false;
        await dtableRef.value.onRefresh();
    } catch (error) {
        alert(error)
    }
}
</script>

<style scoped></style>