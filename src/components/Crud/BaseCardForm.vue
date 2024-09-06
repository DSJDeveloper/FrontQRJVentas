<template>
    <v-dialog v-model="props.dialog" :width="props.width" persistent>


        <v-card>

            <v-card-title>{{ props.title }}</v-card-title>
            <v-progress-linear :active="_loading" :indeterminate="true" color="deep-purple-accent-4" absolute
                bottom></v-progress-linear>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions v-if="!(props.isdeleterow ?? false)">

                <v-btn v-if="!(readonly ?? false)" text="Guadar" color="primary" class="text-primary" variant="tonal"
                    @click="saverow(props.isnewRow)" />

                <v-btn text="Cerrar" variant="text" @click="closedialog(false)"></v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-btn text="Cancelar" variant="text" @click="closedialog(false)"></v-btn>
                <v-btn text="Eliminar" color="error" class="text-error" variant="tonal"
                    @click="deleterow(props.isnewRow)" />


            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script lang="ts" setup>
// import {
//     CirclePlusIcon
// } from 'vue-tabler-icons';

import { defineProps, ref, type Ref } from 'vue'
const emit = defineEmits(['update:dialogClose','update:deleteRow', 'update:saveRow', 'update:loading'])

let props = defineProps<{
    dialog: boolean,
    loading?: boolean,
    isnewRow?: boolean,
    isdeleterow?: boolean,
    readonly?: boolean,
    model?: any,
    width?: string | number,
    title: string
}>();
let _loading: Ref<boolean> = ref(false)
const closedialog = (value: boolean) => {
    emit('update:dialogClose', value)
}
const saverow = (value: any) => {
    emit('update:saveRow', value)
}
const deleterow = (value: any) => {
    emit('update:deleteRow', value)
}
const onLoading = (value: boolean) => {
    _loading.value = value
    emit('update:loading', value ?? false)
}

defineExpose({
    onLoading,
})
</script>

<style scoped></style>