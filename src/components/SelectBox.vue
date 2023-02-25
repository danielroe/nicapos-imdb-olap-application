<template>
  <Listbox v-model="selectedItem">
    <div class="relative z-10 mt-1">
      <ListboxButton
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
      >
        <span class="block truncate rounded-lg border border-gray-200 py-2 pl-3 pr-10">{{ selectedItem }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon name="heroicons:chevron-up-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="item in props.options"
            :key="item"
            v-slot="{ active, selected }"
            :value="item"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-blue-100 text-blue-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{ item }}</span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                <Icon name="ic:round-check" class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { useVModel } from "@vueuse/core";
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from "@headlessui/vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array<string>,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
const selectedItem: Ref = useVModel(props, "modelValue", emit);
</script>
