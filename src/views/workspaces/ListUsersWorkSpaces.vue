<template>
    <BaseList ref="dtableRef" title="Usuarios del WorkSpace" api="Users" :show-pagination="false" :readonly="true" :can-delete="true" :can-edit="true"
        key-field="Id" :headers="_headers" :filter-default="defaultfilter" :view-detail="false" v-on:item-add="addrow"
        v-on:item-edit="editrow">
    </BaseList>
    <BaseCardForm :dialog="dialogformusers" @update:dialog-close="dialogformusers = false" @update:save-row="saverow"
        :model="model" :title="title">
        <template #content>
            <FormUsersWorkSpaces ref="formRef" />
        </template>
    </BaseCardForm>
</template>

<script setup lang="ts">
import BaseList from '@/components/Crud/BaseTable.vue';
import { ComparisonOperators, LogicalOperators, type IModelFilter, type ListModelFilter } from '@/interfaces/IResultBase';
import { onMounted, ref, type Ref } from 'vue';
let props = defineProps<{
    idcompany: string,
}>();
let dialogformusers = ref(true)
const formRef = ref()
const dtableRef = ref()
let title: string = ""
let model: any = {}
let newrow = false;
let defaultfilter: Ref<ListModelFilter> = ref([{ Field: "Companys._idcompany", Value: props.idcompany, Logical: LogicalOperators.AND, Comparison: ComparisonOperators.EQUAL }])
const _headers: any = [
    { title: 'Usuario', key: 'Name', align: 'start' },
    { title: 'E-mail', key: 'Email', align: 'start' },
    { title: 'Estatus', key: 'Status', align: 'start', width: 110 },
    { title: 'Id', key: 'Id', align: ' d-none' }
];
onMounted(() => {
    //    defaultfilter.value = [{ Field: "Companys._idcompany", Value: props.idcompany, Logical: LogicalOperators.AND, Comparison: ComparisonOperators.EQUAL }]
})
const addrow = () => {
    title = "Nuevo Usuario para el WorkSpace";
    // model = {
    //     IdPlan: "free",
    //     WorkSpace: "",
    //     LogoBusiness: "",
    //     name: "",
    //     email: ""
    // };
    newrow = true


    //formRef.value?.onNewRow!(true)
    //dialogformwp.value = true;

}
const editrow = async (row: any) => {
    title = "WorkSpaces";

    //model = row;
    //idrow = model._idcompany
    newrow = false
    //dialogformwp.value = true;
    //formRef.value?.onNewRow(false)


}
const saverow = async () => {
    try {
        if (newrow) {
            await formRef.value?.onCreate!()
        } else {
            await formRef.value?.onUpdate!()
        }
        //dialogformwp.value = false;
        await dtableRef.value.onRefresh();
    } catch (error) {
        alert(error)
    }
}
</script>

<style scoped></style>