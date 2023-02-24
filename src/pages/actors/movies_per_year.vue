<template>
  <div class="p-8">
    <section class="grid gap-1 p-4">
      <h1 class="text-2xl font-bold tracking-tight">Movies per year</h1>
      <p>explore the annual count of movies featuring an actor</p>
    </section>

    <TabGroup>
      <div class="mb-2 flex items-center justify-end gap-4 text-sm">
        <SelectorActors v-model="actor" class="z-20 mr-auto" />

        <span class="text-gray-400">Fetch Time: {{ fetchTime }} ms</span>

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
      </div>
      <TabPanels>
        <TabPanel>
          <div v-if="!loading && data.years.length">
            <client-only>
              <apexchart type="bar" height="350" :options="chart.options" :series="chart.series"></apexchart>
            </client-only>
          </div>
        </TabPanel>

        <TabPanel>
          <Table :data="result"></Table>
        </TabPanel>

        <TabPanel class="rounded-lg border border-gray-200 p-4 text-sm">
          {{ result }}
        </TabPanel>
      </TabPanels>
    </TabGroup>

    <p class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import { Ref } from "vue";
import Table from "../components/Table.vue";
import useQuery from "../../composables/useQuery";

const { runQuery, result, fetchTime, loading, error } = useQuery();

const data = reactive<Object>({
  count_movies: [],
  years: [],
});

const chart = reactive<Object>({
  series: [],
  options: {},
});

const actor: Ref<Object> = ref({});

watch(actor, () =>
  runQuery(`
  SELECT  year,
          COUNT(movie_id) AS count_movies
  FROM (
    SELECT
      roles.actor_id,
      roles.movie_id,
      movies.year
    FROM roles
    LEFT JOIN movies ON movies.id = roles.movie_id
    WHERE roles.actor_id = ${actor.value.id}
  ) t
  LEFT JOIN actors ON actors.id = t.actor_id
  GROUP BY actor_id, year
  ORDER BY year
`)
);

watch(result, () => {
  data.count_movies = result.value.map((row: Object) => row.count_movies);
  data.years = result.value.map((row: Object) => row.year);

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
      categories: data.years,
    },
  };
});
</script>
