<template>
    <form autocomplete="off">
        <v-row>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.Name" autofocus label="Nombre del Usuario" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field :prepend-inner-icon="MailIcon" v-model="_model.Email" :disabled="_disabled" type="email"
                    label="E-mail" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.Pass" autocomplete="new-password" label="Nueva Contraseña"
                    :append-inner-icon="showpass ? EyeOffIcon : EyeIcon" :type="showpass ? 'text' : 'password'"
                    :prepend-inner-icon="LockIcon" @click:append-inner="showpass = !showpass"
                    hide-details></v-text-field>
            </v-col>

        </v-row>

    </form>
</template>

<script setup lang="ts">
import type IFormCrud from "@/interfaces/IFormCrud";
import BaseApiServices from "@/services/BaseApiServices";
import { isNullOrEmpty } from "@/utils/helpers/tools";
import { onBeforeMount, onMounted, defineProps, ref, type Ref } from 'vue';
import { MailIcon, EyeIcon, EyeOffIcon, LockIcon } from 'vue-tabler-icons';
import { errorDialog } from "vuetify3-dialog";
export interface IFormCrudExt extends IFormCrud {
    idCompany?: String
}
let showpass = ref(false)
let _model: any = ref({})
let _disabled: Ref<boolean> = ref(false)
const api = new BaseApiServices("Users")
const props = withDefaults(defineProps<IFormCrudExt>(), {});


onBeforeMount(async () => {
    try {
        props.cardFormRef?.onLoading(true)

        _disabled.value = true
        if (!props.isNewRow) {
            await api.getbyId(props.idRow ?? "")
            _model.value = api.getData()
            _model.value.Pass = ""

        } else {
            _model.value = { Name: "", Email: "", Pass: "" };
            _disabled.value = false
        }
        props.cardFormRef?.onLoading(false)


    } catch (e) {

        errorDialog({ text: String(e) })
    }
});

onMounted(async () => {


})
const onCreate = async () => {
    _model.value.password = _model.value.Pass
    if (!isNullOrEmpty(props.idCompany)) {
        _model.value.idworkspace = props.idCompany
    }
    await api.Add([_model.value], "AddUser")

}
const onUpdate = async () => {


    await api.Update(_model.value)


}
const onDelete = async () => {
    debugger

    await api.Delete([_model.value])


}

defineExpose({

    onUpdate,
    onCreate,
    onDelete
})
</script>

<style lang="scss" scoped></style>