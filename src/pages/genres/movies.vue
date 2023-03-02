<template>
  <div class="p-8">
    <section class="grid gap-1 p-4">
      <h1 class="text-2xl font-bold tracking-tight">Movies per Time Period</h1>
      <p>explore the count of movies in a genre over a period of time</p>
    </section>

    <TabGroup>
      <div class="my-4 flex items-center gap-4 text-sm">
        <FloatingInput label="Genre">
          <SelectorGenres v-model="genre" />
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
            <apexchart type="bar" height="450" :options="chart.options" :series="chart.series"></apexchart>
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
import { Ref, ref } from "vue";
import { watchDebounced } from "@vueuse/core";

const { runQuery, result, fetchTime, loading, error } = useQuery();

const periodOptions = ["year", "decade", "century"];
const period: Ref<string> = ref(periodOptions[0]);

const { query } = useRoute();
if (typeof query.period === "string" && periodOptions.includes(query.period)) {
  period.value = query.period;
}

const data = reactive<Object>({
  count_movies: [],
  period: [],
});

const chart = reactive<Object>({
  series: [],
  options: {},
});

const genre: Ref<Object> = ref({});
const fromYear: Ref<number | undefined> = ref();
const toYear: Ref<number | undefined> = ref();

function isValidYear(year: any) {
  return typeof year === "number" && year >= 1800 && year <= 2100;
}

function updateView() {
  if (Object.keys(genre.value).length === 0) return;

  const query = getGenreMovies(genre.value.genre, period.value, fromYear.value, toYear.value);
  runQuery(query);
}

watch(genre, updateView);
watch(period, updateView);
watchDebounced(fromYear, updateView, { debounce: 500, maxWait: 2000 });
watchDebounced(toYear, updateView, { debounce: 500, maxWait: 2000 });

watch(result, () => {
  data.count_movies = result.value.map((row: Object) => row.count_movies);
  data.period = result.value.map((row: Object) => row.period);

  chart.series = [
    {
      name: "Number of movies",
      data: data.count_movies,
    },
  ];

  chart.options = {
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.period,
    },
  };
});
</script>
