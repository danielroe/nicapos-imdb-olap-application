<template>
  <TabPanels>
    <TabPanel class="rounded-lg border border-gray-200 p-4 text-sm">
      <slot></slot>
    </TabPanel>

    <TabPanel>
      <Table :data="props.result"></Table>
    </TabPanel>

    <TabPanel class="rounded-lg border border-gray-200 p-4 text-sm">
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
});
</script>
