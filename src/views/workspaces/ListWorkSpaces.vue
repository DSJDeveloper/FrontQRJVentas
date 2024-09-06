<template>

    <BaseList ref="dtableRef" title="Listado de WorkSpaces" api="Company" endpointget="getListCompanys"
        :show-pagination="false" :can-delete="false" :can-edit="true" key-field="_idcompany" :headers="_headers"
        :view-detail="false" v-on:item-add="addrow" v-on:item-edit="editrow">

        <template v-slot:[`item._idcompany`]="{ value }">
            <div class="d-flex justify-space-around">

                <v-icon size="large" @click="checkdb(value)">
                    <DatabaseCogIcon v-if="!listchekingdb.includes(value)">
                    </DatabaseCogIcon>
                    <v-progress-circular v-else :size="45" color="primary" indeterminate />
                    <v-tooltip activator="parent">Verificar la Base de datos</v-tooltip>
                </v-icon>

                <v-icon size="large" @click="listusercompany(value)">
                    <UsersIcon />
                    <v-tooltip activator="parent">Ver Usuarios del WorkSpace</v-tooltip>
                </v-icon>
            </div>
        </template>
    </BaseList>
    <BaseCardForm :dialog="dialogformwp" @update:dialog-close="dialogformwp = false" @update:save-row="saverow"
        :model="model" :title="title" :width="600">
        <template #content>
            <FormWorkSpaces ref="formRef" :id-row="idrow" :is-new-row="newrow" :model="model" />
        </template>
    </BaseCardForm>
    <BaseCardForm :dialog="dialogformusers" @update:loading="" @update:dialog-close="dialogformusers = false"
        @update:save-row="saverow" :model="model" :title="title">
        <template #content>
            <ListUsersWorkSpaces :idcompany="idrow" />
        </template>
    </BaseCardForm>
</template>
<script setup lang="ts">
import { computed, ref, type Ref } from 'vue';


import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import FormWorkSpaces from './FormWorkSpaces.vue';

import { DatabaseCogIcon, UsersIcon } from 'vue-tabler-icons';
import { confirmDialog, errorDialog, notifyInfo, notifySuccess } from 'vuetify3-dialog';
import BaseApiServices from '@/services/BaseApiServices';
import { isNullOrEmpty } from '@/utils/helpers/tools';
import ListUsersWorkSpaces from './ListUsersWorkSpaces.vue';

const formRef = ref()
const dtableRef = ref()

let dialogformwp = ref(false)
let dialogformusers = ref(false)
let title: string = ""
let idrow: Ref<string> = ref("")

let model: any
let newrow: boolean = false
let listchekingdb: Ref<Array<string>> = ref([])
const _headers: any = [
    { title: 'Código', key: 'Code', align: 'start', width: 110 },
    { title: 'Espacio de Trabajo', key: 'WorkSpace', align: 'start', width: 300 },
    { title: 'RIF', key: 'IdCompany', align: 'start', width: 130 },
    { title: 'Empresa', key: 'NameCompany', align: 'start' },
    { title: 'Opciones', key: '_idcompany', align: 'center', sortable: false, width: 120 }
];
const listusercompany = (idcompany: string) => {
    idrow.value = idcompany
    dialogformusers.value = true
}
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
    idrow.value = ""

    //formRef.value?.onNewRow!(true)
    dialogformwp.value = true;

}
const editrow = async (row: any) => {
    title = "WorkSpaces";

    model = row;
    idrow = model._idcompany
    newrow = false
    dialogformwp.value = true;
    //formRef.value?.onNewRow(false)


}
const saverow = async () => {
    try {
        if (newrow) {
            await formRef.value?.onCreate!()
        } else {
            await formRef.value?.onUpdate!()
        }
        dialogformwp.value = false;
        await dtableRef.value.onRefresh();
    } catch (e) {
        errorDialog({ text: String(e) })
    }
}

const checkdb = (id: string) => {
    try {
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
    } catch (e) {
        errorDialog({ text: String(e) })
    }
}
</script>

<style scoped></style>