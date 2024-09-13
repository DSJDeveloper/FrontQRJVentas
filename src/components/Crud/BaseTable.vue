<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon></v-icon>{{ props.title }}
      <v-spacer>{{ props.icon }}</v-spacer>
      <v-text-field v-model="search" persistent-placeholder placeholder="Buscar" hide-details>
        <template v-slot:prepend-inner>
          <SearchIcon stroke-width="1.5" size="16" class="text-lightText SearchIcon" />
        </template>

      </v-text-field>

      <!-- <v-divider v-if="_canadd" class="mx-1 " inset vertical></v-divider> -->
      <v-sheet v-if="_canadd" class="ml-1 mr-1">
        <v-btn  class="text-success" color="success" :icon="PlusIcon" @click="addItem">
          <v-tooltip text="Agregar" activator="parent"></v-tooltip>
          <v-icon :icon="PlusIcon"></v-icon>
        </v-btn>
      </v-sheet>
      <v-sheet class="ml-1">
        <!-- <v-divider v-if="_canadd" class="mx-1 " inset vertical></v-divider> -->
        <v-btn color="lightprimary" v-bind:icon="RefreshIcon" @click="onRefresh"><v-tooltip
            text="Volver a cargar los datos" activator="parent"></v-tooltip>
          <v-icon :icon="RefreshIcon"></v-icon></v-btn>
      </v-sheet>
    </v-card-title>


    <v-divider></v-divider>
    <v-data-table-server ref="dtableserver" v-model:items-per-page="itemsPerPage" :headers="props.headers" :items="data"
      item-value="Id" :show-expand="props.showExpand" :sort-by="props.sortBy" :items-length="totalrows"
      :loading="loading" :search="search" :fixed-footer="true" @update:options="loadItems"
      items-per-page-text="Registros por página" loading-text="Cargando....">
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
      </template>
      <!-- <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            More info about {{ item.Id }}
          </td>
        </tr>
      </template> -->
      <template v-for="el in getFilterHeaders(props.headers)" v-slot:[`item.${el.key}`]="{ item }">
        <slot :name="`item.${el.key}`" :value="item[el.key]">
          {{ item[el.key] }}
        </slot>
      </template>

      <template v-if="!props.customstatus" v-slot:[`item.${props.statusField}`]="{ item }">
        <div class="text-start">
          <v-chip :color="item[`${props.statusField}`] == 1 ? 'success' : 'red'"
            :text="item[`${props.statusField}`] == 1 ? 'Activo' : 'Inactivo'" class="text-uppercase" size="small"
            label></v-chip>
        </div>
      </template>

      <template v-if="_canddel || _candedit || _viewdetil" v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-around">
          <v-icon v-if="_candedit" size="large" @click="editItem(item)">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit error" width="44"
              height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00abfb" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
              <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
              <path d="M16 5l3 3" />
            </svg>
            <v-tooltip activator="parent">Editar</v-tooltip>
          </v-icon>

          <v-icon v-if="_canddel" size="large" @click="deleteItem(item)">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-eraser" width="44" height="44"
              viewBox="0 0 24 24" stroke-width="1.5" stroke="#ff2825" fill="none" stroke-linecap="round"
              stroke-linejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
              <path d="M18 13.3l-6.3 -6.3" />
            </svg>
            <v-tooltip activator="parent">Eliminar</v-tooltip>
          </v-icon>
          <v-icon v-if="_viewdetil" size="large" @click="viewItem(item)">


            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="#016527" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-eye">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
            </svg>
            <v-tooltip activator="parent">Ver detalle</v-tooltip>
          </v-icon>

        </div>

      </template>
    </v-data-table-server>
  </v-card>
</template>

<script setup lang="ts">
import type { IModelFilter, IModelSort, ListModelFilter } from '@/interfaces/IResultBase';
import BaseApiServices from '@/services/BaseApiServices';
import { computed, defineProps, onBeforeMount, ref, type Ref } from 'vue';
import { FileIcon, PlusIcon, RefreshIcon } from 'vue-tabler-icons';



const props = defineProps({
  title: { type: String, required: true },
  api: { type: String, required: true },
  endpointget: { type: String, required: false, default: 'GetAll' },
  icon: { required: false },
  readonly: {
    type: Boolean,
    required: false,
    default: false
  },
  canEdit: {
    type: Boolean,
    required: false,
    default: true
  },
  canDelete: {
    type: Boolean,
    required: false,
    default: true
  },
  canAdd: {
    type: Boolean,
    required: false,
    default: true
  },
  customstatus: {
    type: Boolean,
    required: false,
    default: false
  },
  keyField: {
    type: String,
    required: false,
    default: "Id"
  },
  statusField: {
    type: String,
    required: false,
    default: "Status"
  },
  viewDetail: {
    type: Boolean,
    required: false,
    default: true
  },
  headers: {
    type: Array<any>,
    required: false
  },
  sortBy: {
    type: Array<any>,
    required: false,
    default: [{}]
  },
  filterDefault: {
    type: Array<any>,
    required: false,
    default: [{}]
  },
  showExpand: {
    type: Boolean,
    required: false,
    default: false
  },
  expanded: {
    type: Array,
    required: false,
    default: []
  }, showPagination: {
    type: Boolean,
    required: false,
    default: true
  }
});
let data = ref([]);
let loading = ref(true);

let itemsPerPage: Ref<number> = ref(10);
let totalrows: Ref<number> = ref(0);
let search: Ref<string> = ref('');
let _candedit: Ref<boolean> = ref(true);
let _canddel: Ref<boolean> = ref(true);
let _canadd: Ref<boolean> = ref(true);
let _viewdetil: Ref<boolean> = ref(true);
let _lastparams: any = {};
let savelastparam = true;
let dtableserver = ref();
//let _fieldstatus: string = "Status";
// let _fieldid: string = "Id";
const emit = defineEmits(['item-view', 'item-edit', 'item-delete', 'item-add'])
const viewItem = (row: any) => emit('item-view', row);
const editItem = (row: any) => emit('item-edit', row);
const deleteItem = (row: any) => emit('item-delete', row);
const addItem = () => emit('item-add');

function getFilterHeaders(array?: any[]) {
  return !props.customstatus ? array?.filter((v) => v.key != 'Status') : array;
}
const loadItems = async (params: any) => {
  try {
    setDefaultProps();
    if (savelastparam) {
      _lastparams = params
    }
    loading.value = true;
    const apiuser = new BaseApiServices(props.api!, props.endpointget);
    await apiuser.getAll(props?.filterDefault, params?.sortBy, params?.search, params?.itemsPerPage, params?.page);
    data.value = apiuser.getData();
    if (props.showPagination) {

      totalrows.value = apiuser.getPagination()?.totalrows ?? data.value.length;

    } else {
      totalrows.value = data.value.length
    }
    loading.value = false;
  } catch (error) {
    alert(error);
  }
};
const onRefresh = async () => {
  savelastparam = false;

  await loadItems(_lastparams);
  savelastparam = true;
};
const getRows = () => {
  return data.value;
}
defineExpose({
  onRefresh,
  getRows,

})
const setDefaultProps = () => {

  // if (props.keyField != null && props.keyField.length > 0) {
  //   _fieldid = props.keyField
  // }


  // if (props.statusField != null && props.statusField.length > 0) {
  //   _fieldstatus = props.statusField
  // }
}
onBeforeMount(() => {
  setDefaultProps();
  let showactions = false;

  _viewdetil.value = props.viewDetail;

  // if (props.status == null) {
  //   _statusmap = new Map<string, string>([
  //     ['1', 'Activo'],
  //     ['9', 'Inactivo']
  //   ]);
  // } else {
  //   _statusmap = props.status;
  // }


  if (props.viewDetail) {
    showactions = true;
  } else if (!(props.readonly ?? true)) {
    showactions = true;
  }
  if (showactions && props.headers != null && props.headers.findIndex((el: { key: string }) => el.key == 'actions') < 0) {
    props.headers.push({ text: 'Actions', key: 'actions', sortable: false, width: 100 });
  }

  if (!(props.readonly ?? true)) {
    _canddel.value = props.canDelete ?? true;
    _candedit.value = props.canEdit ?? true;
    _canadd.value = props.canAdd ?? true;
  } else {
    _canddel.value = false;
    _candedit.value = false;
    _canadd.value = false;
  }

});



const showexpand = computed(() => {

  const resulta = props.showExpand ? 'show-expand' : ''
  debugger;
  return resulta;
})
</script>

<style lang="scss" scoped>
// tr.v-data-table__selected {
//   background: #7d92f5 !important;
// }
// .v-table tbody tr td:nth-child(even) {
//       background-color: #7d92f5;
// }

// .v-table tbody tr td:nth-child(odd) {
//       background-color: #13141b;
// }</style>