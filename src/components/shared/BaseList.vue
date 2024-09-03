<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon></v-icon>{{ props.title }}
      <v-spacer>{{ props.icon }}</v-spacer>
      <v-text-field
        v-model="search"
        density="compact"
        persistent-placeholder
        placeholder="Buscar"
        color="primary"
        variant="outlined"
        hide-details
      >
        <template v-slot:prepend-inner>
          <SearchIcon stroke-width="1.5" size="16" class="text-lightText SearchIcon" />
        </template>
      </v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="props.headers"
      :items="data"
      :items-length="totalrows"
      :loading="loading"
      :search="search"
      :fixed-footer="true"
      @update:options="loadItems"
      items-per-page-text="Registros por página"
      loading-text="Cargando...."
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <template v-for="header in getFilterHeaders(headers)" v-slot:[`item.${header.key}`]="{ item }">
        <slot :name="`item.${header.key}`" :value="item[header.key]">
          {{ item[header.key] }}
        </slot>
      </template>

      <template v-if="!props.customstatus" v-slot:[`item.Status`]="{ item }">
        <div class="text-start">
          <v-chip
            :color="item['Status'] == 1 ? 'success' : 'red'"
            :text="item['Status'] == 1 ? 'Activo' : 'Inactivo'"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </div>
      </template>

      <template v-if="_canddel || _candedit || _viewdetil" v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-around">
          <v-icon v-if="_viewdetil" size="large" @click="viewItem(item['Id'])">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-id-badge"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#597e8d"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 3m0 3a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3z" />
              <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M10 6h4" />
              <path d="M9 18h6" />
            </svg>
          </v-icon>
          <v-icon v-if="_candedit" size="large" @click="editItem(item['Id'])">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-edit error"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#00abfb"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
          </v-icon>

          <v-icon v-if="_canddel" size="large" @click="deleteItem(item['Id'])">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-eraser"
              width="44"
              height="44"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#ff2825"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
              <path d="M18 13.3l-6.3 -6.3" />
            </svg>
          </v-icon>
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>
    
    <script setup lang="ts">
import BaseApiServices from '@/services/BaseApiServices';
import { defineProps, onBeforeMount, ref, type Ref } from 'vue';

const props = defineProps<{
  title?: string;
  api?: string;
  icon?: any;
  readonly?: boolean;
  canedit?: boolean;
  candelete?: boolean;
  customstatus?: boolean;
  // status?: Map<string, string>;
  viewdetail?: {
    type:boolean,
    default:true
  };
  headers?: any[];
}>();
let data = ref([]);
let loading = ref(true);

let itemsPerPage: Ref<number> = ref(10);
let totalrows: Ref<number> = ref(0);
let search: Ref<string> = ref('');
let _candedit: Ref<boolean> = ref(true);
let _canddel: Ref<boolean> = ref(true);
let _viewdetil: Ref<boolean> = ref(true);
// let _statusmap: Map<string, string>;
const viewItem = (id: any) => {
  console.log(id);
};
const editItem = (id: any) => {
  console.log(id);
};
const deleteItem = (id: any) => {
  console.log(id);
};
function getFilterHeaders(array?: any[]) {
  return !props.customstatus ? array?.filter((v) => v.key != 'Status') : array;
}
const loadItems = async (params: any) => {
  try {
    loading.value = true;
    const apiuser = new BaseApiServices(props.api!);
    await apiuser.getAll(null, params?.sortBy, params?.search, params?.itemsPerPage, params?.page);
    const pagination = apiuser.getPagination();
    data.value = apiuser.getData();
    totalrows.value = pagination.totalrows;
    loading.value = false;
  } catch (error) {
    alert(error);
  }
};
onBeforeMount(() => {
  let showactions = false;
  const addviewdetail = props.viewdetail;
  //_viewdetil.value = addviewdetail;

  // if (props.status == null) {
  //   _statusmap = new Map<string, string>([
  //     ['1', 'Activo'],
  //     ['9', 'Inactivo']
  //   ]);
  // } else {
  //   _statusmap = props.status;
  // }

  console.log(addviewdetail);
  if (addviewdetail) {
    showactions = true;
  } else if (!(props.readonly ?? true)) {
    showactions = true;
  }
  if (showactions && props.headers != null && props.headers.findIndex((el: { key: string }) => el.key == 'actions') < 0) {
    props.headers.push({ text: 'Actions', key: 'actions', sortable: false, width: 100 });
  }

  if (!(props.readonly ?? true)) {
    _canddel.value = props.candelete ?? true;
    _candedit.value = props.canedit ?? true;
  } else {
    _canddel.value = false;
    _candedit.value = false;
  }
});
</script>
    
    <style lang="scss" scoped>
</style>