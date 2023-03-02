<template>
  <Combobox v-model="selected">
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
      >
        <ComboboxInput
          class="w-full rounded-lg border-gray-200 py-2 pl-3 pr-12 text-sm leading-5 text-gray-900 focus:ring-0"
          :display-value="(actor) => actor.name"
          @change="search = $event.target.value"
        />
        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
          <LoadingIndicator v-if="loading" class="mr-1 h-3 w-3" />
          <Icon name="heroicons:chevron-up-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="search = ''"
      >
        <ComboboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <div
            v-if="result.length === 0 && search !== ''"
            class="relative cursor-default select-none py-2 px-4 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="actor in result"
            :key="actor.id"
            v-slot="{ selected: isSelected, active }"
            as="template"
            :value="actor"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-blue-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span class="block truncate" :class="{ 'font-medium': isSelected, 'font-normal': !isSelected }">
                {{ actor.name }}
              </span>
              <span
                v-if="isSelected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-blue-600': !active }"
              >
                <Icon name="ic:round-check" class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup lang="ts">
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { useVModel, watchDebounced } from "@vueuse/core";

const props = defineProps<{
  modelValue: Object;
}>();
const emit = defineEmits(["update:modelValue"]);
const selected = useVModel(props, "modelValue", emit);

const { runQuery, result, loading } = useQuery();

const search = ref("");
watchDebounced(search, (value) => runQuery(getSearchActors(value)), { debounce: 500, maxWait: 2000 });
</script>
