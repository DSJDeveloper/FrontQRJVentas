<template>
    <v-row>
        <v-col cols="12" md="2">
            <v-text-field v-model="props.model.Code" autofocus readonly label="Código" hide-details></v-text-field>
        </v-col>
        <v-col cols="12" md="8">
            <v-text-field v-model="props.model.Description" readonly label="Vendedor" hide-details></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
            <v-text-field v-model="props.model.UserAccount" readonly label="Email" hide-details></v-text-field>
        </v-col>
    </v-row>
    <div class="d-flex justify-center align-start pa-5 " style="height: 300px;">
        <div class="d-flex align-start bg-surface-variant pa-2 rounded h-100 w-100">
            <vue-json-pretty :data="props.model.CustomAttributes" :deep="5" :show-line="true" :show-double-quotes="true"
                :show-length="true" :show-line-number="true" :collapsed-on-click-brackets="true" :show-icon="true"
                :show-key-value-space="true"  style="position: relative"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
let props = defineProps<{
    model: any
}>();
</script>

<style scoped></style>