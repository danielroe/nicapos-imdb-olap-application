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

        <TabOptions />
      </div>

      <TabResults :result="result"> Not available for custom queries. Check table and JSON views. </TabResults>
    </TabGroup>
  </div>
</template>

<script setup lang="ts">
import { TabGroup } from "@headlessui/vue";
import useQueryRef from "../composables/useQueryRef";

const query = ref("");
const { runQuery, result, fetchTime, error } = useQueryRef(query);
</script>
