<template>
  <Combobox v-model="selected" :multiple="props.allowMultiple">
    <div class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300 sm:text-sm"
      >
        <ComboboxInput
          class="w-full rounded-lg border-gray-200 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
          :display-value="(genre: any) => props.allowMultiple ? genre.map((v: Object) => v.genre).join(', ') : genre.genre"
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
            v-for="genre in result"
            :key="genre.id"
            v-slot="{ selected: isSelected, active }"
            as="template"
            :value="genre"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-blue-600 text-white': active,
                'text-gray-900': !active,
              }"
            >
              <span class="block truncate" :class="{ 'font-medium': isSelected, 'font-normal': !isSelected }">
                {{ genre.genre }}
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
import { useVModel, refDebounced } from "@vueuse/core";
import useQuery from "../composables/useQuery";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  allowMultiple: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);
const selected = useVModel(props, "modelValue", emit);

const { runQuery, result, loading } = useQuery();

const search = ref("");
const debouncedSearch = refDebounced(search, 500);

const query = computed(
  () => `
  SELECT DISTINCT genre
  FROM movies_genres
  WHERE genre LIKE '${debouncedSearch.value}%'
  ORDER BY genre
  LIMIT   100
`
);

runQuery(query.value);
watch(debouncedSearch, () => runQuery(query.value));
</script>
