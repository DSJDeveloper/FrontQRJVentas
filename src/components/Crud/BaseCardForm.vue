<template>
    <v-dialog v-model="props.dialog" :width="props.width" persistent>

        <v-card>
            <v-card-title>{{ props.title }}</v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions>
                <v-btn text="Guadar" color="primary" class="text-primary" variant="tonal" @click="saverow(props.isnewRow)"/>
                
                <v-btn text="Cerrar" variant="text" @click="closedialog(false)"></v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script lang="ts" setup>
// import {
//     CirclePlusIcon
// } from 'vue-tabler-icons';

import { defineProps } from 'vue'
const emit = defineEmits(['update:dialogClose', 'update:saveRow'])

let props = defineProps<{
    dialog: boolean,
    // loading?:boolean,
    isnewRow?: boolean,
    model?: any,
    width?: string | number,
    title: string
}>();

const closedialog = (value: boolean) => {
    emit('update:dialogClose', value)
}
const saverow = (value: any) => {
    emit('update:saveRow', value)
}

</script>

<style scoped></style>