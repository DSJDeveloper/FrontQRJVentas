<script setup lang="ts">
import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import { ref, type Ref } from 'vue';
import FormUsers from './FormUsers.vue';
import { confirmDialog, errorDialog, notifySuccess } from 'vuetify3-dialog';
const formRef = ref()
const formCardRef = ref()
const dtableRef = ref()
let idrow: Ref<string> = ref("")
let modeluser: Ref<any> = ref(null)
let newrow: Ref<boolean> = ref(false)
let _delete: Ref<boolean> = ref(false)
let dialogformuser = ref(false)
const _headers: any = [
  { title: 'Usuario', key: 'Name', align: 'start' },
  { title: 'E-mail', key: 'Email', align: 'start' },
  { title: 'Estatus', key: 'Status', align: 'start', width: 110 },
  { title: 'Id', key: 'Id', align: ' d-none' }
];

let title = ""

const addrow = () => {
  title = "Nuevo Usuario";
  // model = {
  //   IdPlan: "free",
  //   WorkSpace: "",
  //   LogoBusiness: "",
  //   name: "",
  //   email: ""
  // };
  newrow.value = true
  idrow.value = ""
  _delete.value = false
  //formRef.value?.onNewRow!(true)
  dialogformuser.value = true;

}

const editrow = async (row: any) => {

  title = "Editar Usuario";

  //formRef.value?.onNewRow!(false)
  // model = row;
  idrow.value = row.Id
  newrow.value = false
  _delete.value = false
  dialogformuser.value = true;


}
const delrow = async (row: any) => {
  title = "Eliminar Usuario";
  idrow.value = row.Id;
  _delete.value = true
  modeluser = row;
  dialogformuser.value = true;
  /*
  try {
    confirmDialog({
      title: import.meta.env.VITE_TITLE_APP, text: "¿Estás seguro de Eliminar el Registro Seleccionado?",
      cancelText: "Cancelar", confirmationText: "Eliminar"
    })
      .then(async (anwser) => {
        if (anwser == true) {
          
          await formRef.value?.onDelete();
          await dtableRef.value.onRefresh();
          notifySuccess(`Se ha Eliminado el Registro Correctamente`).then(() => { })
        }
      })
  } catch (e) {
    errorDialog({ text: String(e) })
  }
  */

}
const saverow = async () => {
  try {
    if (newrow.value) {
      await formRef.value?.onCreate()
    } else {
      await formRef.value?.onUpdate!()
    }
    dialogformuser.value = false;
    await dtableRef.value.onRefresh();
  } catch (e) {
    errorDialog({ text: String(e) })
  }
}
const processdelete = async () => {
  try {
    await formRef.value?.onDelete();
    await dtableRef.value.onRefresh();
    dialogformuser.value = false;

  } catch (e) {
    errorDialog({ text: String(e) })
  }
}

</script>
<template>


  <BaseList ref="dtableRef" title="Listado de Usuarios" api="Users" :show-pagination="true" :can-delete="true"
    :can-edit="true" key-field="_idcompany" :headers="_headers" :view-detail="false" v-on:item-add="addrow"
    v-on:item-delete="delrow" v-on:item-edit="editrow">
  </BaseList>
  <BaseCardForm ref="formCardRef" :dialog="dialogformuser" @update:dialog-close="dialogformuser = false"
    v-on:item-add="addrow" :isdeleterow="_delete" v-on:item-edit="editrow" @update:delete-row="processdelete"
    @update:save-row="saverow" :title="title" :width="600">
    <template #content>
      <FormUsers ref="formRef" :isdeleterow="_delete" :model="modeluser" :card-form-ref="formCardRef" :id-row="idrow"
        :is-new-row="newrow" />
    </template>
  </BaseCardForm>

</template>



<style scoped></style>
