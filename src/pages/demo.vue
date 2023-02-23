<template>
  <div class="grid gap-4 p-8 text-sm">
    <div class="grid gap-2">
      <label for="message" class="block font-medium text-gray-900">Query</label>
      <textarea
        id="message"
        v-model="query"
        rows="4"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 placeholder:italic focus:border-blue-500 focus:ring-blue-500"
        placeholder="SELECT * FROM ..."
      ></textarea>

      <div class="flex items-center justify-end gap-4">
        <span class="text-red-700">{{ error }}</span>

        <button
          type="button"
          class="rounded-lg bg-blue-700 px-5 py-2.5 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-gray-500"
          :disabled="!query"
          @click="runQuery"
        >
          Run
        </button>
      </div>
    </div>

    <TabGroup>
      <div class="mb-2 flex items-center justify-end gap-4 text-sm">
        <b class="mb-2 mr-auto block font-medium text-gray-900">Result</b>
        <span class="text-gray-400">Fetch Time: {{ fetchTime }} ms</span>

        <TabList class="inline-flex rounded-md text-sm font-medium text-gray-900 shadow-sm">
          <Tab
            class="rounded-l-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
          >
            JSON
          </Tab>
          <Tab
            class="border-t border-b border-gray-200 bg-white px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
          >
            Table
          </Tab>
          <Tab
            class="rounded-r-md border border-gray-200 bg-white px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
          >
            Graph
          </Tab>
        </TabList>
      </div>
      <TabPanels>
        <TabPanel class="rounded-lg border border-gray-200 p-4 text-sm">
          {{ result }}
        </TabPanel>
        <TabPanel>
          <Table :data="result"></Table>
        </TabPanel>
        <TabPanel>
          <client-only>
            <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
          </client-only>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Table from "../components/Table.vue";
import useQueryRef from "../composables/useQueryRef";

const query = ref("");
const { runQuery, result, fetchTime, error } = useQueryRef(query);

const series = [
  {
    name: "Peter",
    data: [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
  },
  {
    name: "Johnny",
    data: [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
  },
  {
    name: "David",
    data: [null, null, null, null, 3, 4, 1, 3, 4, 6, 7, 9, 5, null, null, null],
  },
];
const chartOptions = {
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
    animations: {
      enabled: false,
    },
  },
  stroke: {
    width: [5, 5, 4],
    curve: "straight",
  },
  labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  title: {
    text: "Missing data (null values)",
  },
  xaxis: {},
};
</script>
