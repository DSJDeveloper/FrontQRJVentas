<template>
    <v-dialog v-model="props.dialog">

        <v-card>
            <v-card-title>{{ props.title }}</v-card-title>
            <v-card-text>
                <slot name="content"></slot>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Cerrar" variant="text" @click="closedialog(false)"></v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script lang="ts" setup>
import { defineProps, onBeforeMount, ref } from 'vue'
const emit = defineEmits(['update:dialogClose'])

let props = defineProps<{
    dialog: boolean,
    model?: any,
    title: string
}>();
// onBeforeMount(() => {
//     //_dialog = props.dialog
// });
const closedialog = (value: boolean) => {
    emit('update:dialogClose', value)
}
</script>

<style scoped></style>