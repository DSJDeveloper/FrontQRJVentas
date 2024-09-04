<template>
    <form>
        <v-row v-if="!newRow">
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.Code" autofocus readonly label="#" hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.WorkSpace" readonly label="Espacio de Trabajo"
                    hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.NameCompany" readonly label="Empresa" hide-details></v-text-field>
            </v-col>
        </v-row>
        <v-row v-else-if="newRow">
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.WorkSpace" autofocus label="Espacio de Trabajo"
                    hide-details></v-text-field>
            </v-col>
            <v-col cols="12" md="12">
                <v-text-field v-model="_model.NameCompany" label="Empresa" hide-details></v-text-field>
            </v-col>
        </v-row>

    </form>

</template>

<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from 'vue'

let _model: any = ref({})


let props = defineProps<{
    model: any,
    newRow: boolean
}>();
onBeforeMount(() => {
    _model = props.model
});


</script>

<style scoped></style>