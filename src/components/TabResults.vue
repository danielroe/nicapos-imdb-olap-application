<template>
  <LoadingChart v-if="props.loading" />
  <TabPanels v-else>
    <TabPanel class="tab overflow rounded-lg border border-gray-200 p-4 text-sm">
      <i v-if="props.result.length === 0">No data to display.</i>
      <slot v-else></slot>
    </TabPanel>

    <TabPanel class="tab overflow-y-scroll rounded-lg border border-gray-200 p-4 text-sm">
      <Table v-if="props.result.length" :data="props.result"></Table>
      <i v-else>No data to display.</i>
    </TabPanel>

    <TabPanel class="tab overflow-y-scroll rounded-lg border border-gray-200 p-4 text-sm">
      <pre v-if="props.result.length" class="max-w-screen whitespace-pre-wrap break-words">{{
        JSON.stringify(props.result, null, 2)
      }}</pre>
      <i v-else>No data to display.</i>
    </TabPanel>
  </TabPanels>
</template>

<script setup>
import { TabPanels, TabPanel } from "@headlessui/vue";
import Table from "../components/Table.vue";

const props = defineProps({
  result: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
</script>

<style>
.tab {
  height: 485px;
}
</style>
