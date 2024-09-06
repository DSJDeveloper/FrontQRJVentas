<template>


  <BaseList ref="dtableRef" title="Listado de Usuarios" api="Users" :show-pagination="true" :can-delete="true"
    :can-edit="true" key-field="_idcompany" :headers="_headers" :view-detail="false" v-on:item-add="addrow"
    v-on:item-delete="delrow" v-on:item-edit="editrow">
  </BaseList>
  <BaseCardForm ref="formCardRef" :dialog="dialogformuser" @update:dialog-close="dialogformuser = false"
    v-on:item-add="addrow" v-on:item-edit="editrow" @update:save-row="saverow" :title="title" :width="600">
    <template #content>
      <FormUsers ref="formRef" :card-form-ref="formCardRef" :id-row="idrow" :is-new-row="newrow" />
    </template>
  </BaseCardForm>

</template>

<script setup lang="ts">
import BaseList from '@/components/Crud/BaseTable.vue';
import BaseCardForm from '@/components/Crud/BaseCardForm.vue';
import { useTemplateRef,ref, type Ref } from 'vue';
import FormUsers from './FormUsers.vue';
import { confirmDialog, errorDialog, notifySuccess } from 'vuetify3-dialog';
const formRef = useTemplateRef('formRef')
const formCardRef = ref()
const dtableRef = ref()
let idrow: Ref<string> = ref("")
let newrow: Ref<boolean> = ref(false)
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

  //formRef.value?.onNewRow!(true)
  dialogformuser.value = true;

}

const editrow = async (row: any) => {

  title = "Editar Usuario";
  
  //formRef.value?.onNewRow!(false)
  // model = row;
  idrow.value = row.Id
  newrow.value = false
  
  dialogformuser.value = true;


}
const delrow = async (row: any) => {
  try {
    confirmDialog({
      title: import.meta.env.VITE_TITLE_APP, text: "¿Estás seguro de Eliminar el Registro Seleccionado?",
      cancelText: "Cancelar", confirmationText: "Eliminar"
    })
      .then(async (anwser) => {
        if (anwser == true) {
          idrow.value = row.Id;
          debugger
          await formRef.onDelete();
          await dtableRef.value.onRefresh();
          notifySuccess(`Se ha Eliminado el Registro Correctamente`).then(() => { })
        }
      })
  } catch (e) {
    errorDialog({ text: String(e) })
  }


}
const saverow = async () => {
  try {
    if (newrow.value) {
      await formRef.onCreate!()
    } else {
      await formRef.onUpdate!()
    }
    dialogformuser.value = false;
    await dtableRef.value.onRefresh();
  } catch (e) {
    errorDialog({ text: String(e) })
  }
}


</script>

<style scoped></style>
