<template>
  <div class="p-8">
    <section class="grid gap-1 p-4">
      <h1 class="text-2xl font-bold tracking-tight">Rankings through Time Period</h1>
      <p>Compare genre performance using average movie rankings over a period of time</p>
    </section>

    <TabGroup>
      <div class="my-4 flex items-center gap-4 text-sm">
        <FloatingInput label="Genre">
          <SelectorGenres v-model="genres" allow-multiple />
        </FloatingInput>

        <FloatingInput label="Period">
          <SelectBox v-model="period" :options="periodOptions" class="w-32" />
        </FloatingInput>

        <FloatingInput label="From">
          <input
            v-model.number="fromYear"
            type="number"
            class="w-24 rounded-lg border border-gray-200 py-2 px-3 text-sm leading-5 focus:ring-0"
            :class="isValidYear(fromYear) ? 'text-black' : 'text-gray-400'"
          />
        </FloatingInput>

        <FloatingInput label="To">
          <input
            v-model.number="toYear"
            type="number"
            class="w-24 rounded-lg border border-gray-200 py-2 px-3 text-sm leading-5 focus:ring-0"
            :class="isValidYear(toYear) ? 'text-black' : 'text-gray-400'"
          />
        </FloatingInput>

        <TabOptions class="ml-auto" />
      </div>

      <TabResults :result="result" :loading="loading">
        <div v-if="!loading && data.period.length" class="z-0">
          <client-only>
            <apexchart type="line" height="450" :options="chart.options" :series="chart.series"></apexchart>
          </client-only>
        </div>
      </TabResults>

      <span v-if="fetchTime" class="text-xs text-gray-400">Fetch Time: {{ fetchTime }} ms</span>
    </TabGroup>

    <p class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { TabGroup } from "@headlessui/vue";
import { Ref, ref, ComputedRef } from "vue";
import { watchDebounced } from "@vueuse/core";

const { runQuery, result, fetchTime, loading, error } = useQuery();

const periodOptions = ["year", "decade", "century"];
const period: Ref<string> = ref(periodOptions[0]);

const { query } = useRoute();
if (typeof query.period === "string" && periodOptions.includes(query.period)) {
  period.value = query.period;
}

const data = reactive<Object>({
  period: [],
});

const chart = reactive<Object>({
  series: [],
  options: {},
});

const genres: Ref<Object> = ref([]);
const genreList: ComputedRef<string[]> = computed(() => genres.value.map((v: Object) => v.genre));
const fromYear: Ref<number | undefined> = ref();
const toYear: Ref<number | undefined> = ref();

function isValidYear(year: any) {
  return typeof year === "number" && year >= 1800 && year <= 2100;
}

function updateView() {
  if (genres.value.length === 0) return;

  const query = getGenreRankings(genreList.value, period.value, fromYear.value, toYear.value);
  runQuery(query);
}

watchDebounced(genres, updateView, { debounce: 1000, maxWait: 2000 });
watch(period, updateView);
watchDebounced(fromYear, updateView, { debounce: 500, maxWait: 2000 });
watchDebounced(toYear, updateView, { debounce: 500, maxWait: 2000 });

watch(result, () => {
  data.period = result.value.map((row: Object) => row.period);

  chart.series = genreList.value.map((genre: string) => ({
    name: genre,
    data: result.value.map((row: Object) => row[genre]),
  }));

  chart.options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    xaxis: {
      categories: data.period,
    },
  };
});
</script>
