<template>

    <BaseList ref="dtableRef" title="Listado de WorkSpaces" api="Company" endpointget="getListCompanys"
        :show-pagination="false" :can-delete="false" :can-edit="true" key-field="_idcompany" :headers="_headers"
        :view-detail="false" v-on:item-add="addrow" v-on:item-edit="editrow">

        <template v-slot:[`item._idcompany`]="{ value }">
            <v-icon size="large" @click="checkdb(value)">
                <DatabaseCogIcon v-if="!listchekingdb.includes(value)" />
                <v-progress-circular v-else :size="45" color="primary" indeterminate />
            </v-icon>
        </template>
    </BaseList>
    <BaseCardForm :dialog="dialogform" @update:dialog-close="dialogform = false" @update:save-row="saverow"
        :model="model" :title="title" :width="600">
        <template #content>
            <FormWorkSpaces ref="formRef" :id-row="idrow" :is-new-row="newrow" :model="model" />
        </template>

    </BaseCardForm>

</template>
<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';


import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import FormWorkSpaces from './FormWorkSpaces.vue';

import { DatabaseCogIcon } from 'vue-tabler-icons';
import { confirmDialog, notifyInfo, notifySuccess } from 'vuetify3-dialog';
import BaseApiServices from '@/services/BaseApiServices';
import { isNullOrEmpty } from '@/utils/helpers/tools';

const formRef = ref()
const dtableRef = ref()

let dialogform = ref(false)
let title: string = ""
let idrow: string = ""
let model: any
let newrow: boolean = false
let listchekingdb: Ref<Array<string>> = ref([])
const _headers: any = [
    { title: 'Código', key: 'Code', align: 'start', width: 110 },
    { title: 'Espacio de Trabajo', key: 'WorkSpace', align: 'start', width: 300 },
    { title: 'RIF', key: 'IdCompany', align: 'start', width: 130 },
    { title: 'Empresa', key: 'NameCompany', align: 'start' },
    // { title: 'Mantenimiento', key: '_idrols', value: (e: any) => e._idcompany, align: 'start' },
    { title: 'Verificar', key: '_idcompany', align: 'center', sortable: false, width: 100 }
];
const chekcingdb = computed(() => {

    return (id: string) => {
        if (listchekingdb.value.length > 0) {
            const indx = listchekingdb.value.find((e: string) => e == id)

            return (indx != null)
        }
        return false
    }
});
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

const checkdb = (id: string) => {
    const rows: any = dtableRef.value.getRows();
    const inforow = rows.filter((d: { _idcompany: string }) => d._idcompany == id)[0]
    const namecompany = isNullOrEmpty(inforow.NameCompany) ? inforow.WorkSpace : inforow.NameCompany
    if (listchekingdb.value.find((e: string) => e == id) != null) {
        notifyInfo(`Ya se esta ejecutando la verificación, para la empresa ${namecompany}`).then(() => { })
        return
    }
    confirmDialog({
        title: import.meta.env.VITE_TITLE_APP, text: "Esta opción puede tardar unos minutos ¿Esta seguro de continuar?",
        cancelText: "Cancelar", confirmationText: "Ok"
    })
        .then(async (anwser) => {
            if (anwser == true) {
                if (listchekingdb.value.find((e: string) => e == id) == null) {
                    listchekingdb.value.push(`${id}`)
                }
                await new BaseApiServices('Company').Post(`CheckDataBasebyID/${id}`)
                if (listchekingdb.value.find((e: string) => e == id) != null) {
                    listchekingdb.value = listchekingdb.value.filter(e => e !== id);
                }
                notifySuccess(`Ha finalizado la verificación de la empresa ${namecompany}`).then(() => { })
            }
        })
}
</script>

<style scoped></style>