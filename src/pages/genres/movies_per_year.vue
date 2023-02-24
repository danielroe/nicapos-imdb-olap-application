<template>
  <div class="p-8">
    <section class="grid gap-1 p-4">
      <!-- Edit view title/description here -->
      <h1 class="text-2xl font-bold tracking-tight">Movies per year</h1>
      <p>explore the annual count of movies in a genre</p>
    </section>

    <TabGroup>
      <div class="mb-2 flex items-center justify-end gap-4 text-sm">
        <SelectorGenres v-model="genre" class="z-20 mr-auto" />

        <span v-if="fetchTime" class="text-gray-400">Fetch Time: {{ fetchTime }} ms</span>

        <TabOptions />
      </div>

      <TabResults :result="result">
        <div v-if="!loading && data.years.length">
          <client-only>
            <!-- Edit chart type/height here -->
            <apexchart type="bar" height="350" :options="chart.options" :series="chart.series"></apexchart>
          </client-only>
        </div>
      </TabResults>
    </TabGroup>

    <p class="text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { TabGroup } from "@headlessui/vue";
import { Ref } from "vue";
const { runQuery, result, fetchTime, loading, error } = useQuery();

/* Edit this based on query data */
const data = reactive<Object>({
  count_movies: [],
  years: [],
});

const chart = reactive<Object>({
  series: [],
  options: {},
});

const genre: Ref<Object> = ref({});

/* Edit query here */
watch(genre, () =>
  runQuery(`
  SELECT year, COUNT(movie_id) as count_movies
  FROM (SELECT movie_id, year FROM movies_genres LEFT JOIN movies on movies.id = movies_genres.movie_id WHERE genre LIKE '${genre.value.genre}') t 
  GROUP BY year 
  ORDER BY year
  `)
);

watch(result, () => {
  /*
    Edit this whole part part, map query data to data then edit chart.series and chart.options depending on how you want the chart/graph to look like. 
    Chart docs: https://apexcharts.com/docs/vue-charts/
  */
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
