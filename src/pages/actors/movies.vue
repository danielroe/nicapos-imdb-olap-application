<template>
  <div class="p-8">
    <section class="grid gap-1 p-4">
      <h1 class="text-2xl font-bold tracking-tight">Movies per Time Period</h1>
      <p>explore the count of movies featuring an actor through a period of time</p>
    </section>

    <TabGroup>
      <div class="my-4 flex items-center gap-4 text-sm">
        <FloatingInput label="Actor">
          <SelectorActors v-model="actor" />
        </FloatingInput>

        <FloatingInput label="Period">
          <SelectBox v-model="period" :options="periodOptions" class="w-32" />
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

const actor: Ref<Object> = ref({});

function updateView() {
  if (Object.keys(actor.value).length === 0) return;

  const query = getActorMovies(actor.value.id, period.value);
  runQuery(query);
}

watch(actor, updateView);
watch(period, updateView);

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
