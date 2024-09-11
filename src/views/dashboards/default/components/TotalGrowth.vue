<script setup lang="ts">
import { ref, computed, watch, type Ref } from 'vue';
import BaseApiServices from '@/services/BaseApiServices';


const api = new BaseApiServices('DashboardOrder')
let chartOptions1: Ref<any> = ref([{}])
const select = ref({ state: 'Hoy', abbr: 'T' });
const items = [
  { state: 'Hoy', abbr: 'T' },
  { state: 'Este Mes', abbr: 'M' },
  { state: 'Este Año', abbr: 'A' }
];

// chart 1
const lineChart1: Ref<any> = ref({
  total: 0,
  series: [
    {
      name: 'Total',
      data: []
    },
    {
      name: 'Pedidos',
      data: []
    }
  ]
});
const total = computed(() => lineChart1.value.total.toLocaleString())


const updateshart = async () => {
  await api.get(`getTotalOrder/${select.value.abbr}`)
  ////////////////////
  const _data = api.getData()
  ////////////////////
  lineChart1.value.total = 0;
  lineChart1.value.series[0].data = [];
  lineChart1.value.series[1].data = [];
  chartOptions1.value = {
    chart: {
      type: 'bar',
      height: 480,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      stacked: true,
    },

    colors: ['#5e35b1', '#ede7f6'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: [],
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: undefined,
      formatter: function (val: number, opts: any) {
        debugger;
        return val.toLocaleString()
      }
    },
    grid: {
      show: true
    },
    tooltip: {
      shared: true,
      intersect: false,

      theme: 'dark'
    }
  };
  ////////////////////
  if (_data.length > 0) {
    lineChart1.value.total = _data[0].Total
    lineChart1.value.series[0].data = _data[0].Values
    lineChart1.value.series[1].data = _data[0].Counts
    chartOptions1.value.xaxis.categories = _data[0].Categories
  }
}
updateshart()
watch(select, async () => {
  updateshart()
})
</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-2 text-disabled font-weight-bold">Total Pedidos</span>
            <h3 class="text-h3 mt-1">$ {{ total }}</h3>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select color="primary" variant="outlined" hide-details v-model="select" :items="items" item-title="state"
              item-value="abbr" label="Select" persistent-hint return-object single-line>
            </v-select>
          </v-col>
        </v-row>
        <div class="mt-4">
          <apexchart type="bar" height="480" :options="chartOptions1" :series="lineChart1.series"> </apexchart>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>
