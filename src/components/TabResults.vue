<template>
  <LoadingChart v-if="props.loading" />
  <TabPanels v-else>
    <TabPanel class="tab overflow rounded-lg border border-gray-200 p-4 text-sm">
      <slot></slot>
    </TabPanel>

    <TabPanel class="tab overflow-y-scroll rounded-lg border border-gray-200 p-4 text-sm">
      <Table v-if="props.result.length" :data="props.result"></Table>
    </TabPanel>

    <TabPanel class="tab overflow-y-scroll rounded-lg border border-gray-200 p-4 text-sm">
      {{ props.result }}
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
