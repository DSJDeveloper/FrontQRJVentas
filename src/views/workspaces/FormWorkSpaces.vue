<template>
    <form>

        <v-row>
            <v-col v-if="!newrow" cols="12" md="12">
                <v-text-field v-model="_model.Code" autofocus readonly label="#" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.WorkSpace" autofocus label="Espacio de Trabajo"
                    hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.IdCompany" label="RIF" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.BusinessName" label="Empresa" hide-details></v-text-field>
            </v-col>
        </v-row>
       
    </form>
</template>

<script setup lang="ts">
import type IFormCrud from '@/interfaces/IFormCrud';
import { defineProps, onBeforeMount, onMounted, ref, type Ref } from 'vue'

import BaseApiServices from '@/services/BaseApiServices';
import { required } from '@vuelidate/validators';
import { errorDialog } from 'vuetify3-dialog';



let _model: any = ref({})
let newrow = ref(false)
let loading: Ref<boolean> = ref(true)
const props = withDefaults(defineProps<IFormCrud>(), {});
const api = new BaseApiServices('Company')

const rules = {
    WorkSpace: { required }
}
onBeforeMount(async () => {
    try {

        newrow.value = props?.isNewRow;
        if (!(props?.isNewRow ?? false)) {
            if (props.idRow == null) {
                alert("No se ha definido el ID")
            }
            await api.getbyId(props.idRow!)
            _model.value = api.getData()
        } else {
            _model.value = {
                IdPlan: "free",
                WorkSpace: "",
                IdCompany: "",
                // FiscalAddress: "",
                BusinessName: "",
                LogoBusiness: "",
                name: "",
                email: ""
            };
        }
        loading.value = false
    } catch (e) {
        errorDialog({  text: String(e) })
    }
});
onMounted(() => {

    // console.log(_model.value)
    // 
    // console.log(_model.value)
    // debugger
})
const onCreate = async () => {
    // try {
    await api.Add(_model.value)
    // } catch (e) {
    //     alert(e);
    // }
}
const onUpdate = async () => {
    // try {
    newrow.value = false
    await api.Update(_model.value)

    // } catch (e) {
    //     alert(e);
    // }
    //_model.value = row;
}
// const onNewRow = (value: boolean) => {
//     newrow.value = value
// }


defineExpose({
    
    onUpdate,
    onCreate
})
</script>

<style scoped></style>