<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th v-for="(head, index) in headings" :key="index" scope="col" class="px-6 py-3">{{ head }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in props.data" :key="index" class="border-b bg-white">
          <td v-for="head in headings" :key="head" class="px-6 py-4">{{ row[head] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

type MyObject = {
  [key: string]: any;
};

const props = defineProps({
  data: {
    type: Array as PropType<MyObject[]>,
    required: true,
  },
});

const headings = computed(() => Object.keys(props.data[0]));
</script>
