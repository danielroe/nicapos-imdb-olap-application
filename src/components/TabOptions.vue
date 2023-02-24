<template>
  <TabList class="inline-flex rounded-md text-sm font-medium text-gray-900 shadow-sm">
    <Tab
      class="rounded-l-lg border border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
    >
      Graph
    </Tab>
    <Tab
      class="border-t border-b border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
    >
      Table
    </Tab>
    <Tab
      class="rounded-r-md border border-gray-200 px-4 py-2 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700"
    >
      JSON
    </Tab>
  </TabList>
</template>

<script setup lang="ts">
import { TabList, Tab } from "@headlessui/vue";
</script>
