<template>
  <div class="p-8">
    <section class="grid gap-1 p-4">
      <h1 class="text-2xl font-bold tracking-tight">Movies per decade</h1>
      <p>view the movies in genres through the decades</p>
    </section>

    <TabGroup>
      <div class="mb-2 flex items-center justify-end gap-4 text-sm">
        <SelectorGenres v-model="genre" class="z-20 mr-auto" />

        <span v-if="fetchTime" class="text-gray-400">Fetch Time: {{ fetchTime }} ms</span>

        <TabOptions />
      </div>

      <TabResults :result="result">
        <div v-if="!loading && data.decades.length">
          <client-only>
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

const data = reactive<Object>({
  count_movies: [],
  decades: [],
});

const chart = reactive<Object>({
  series: [],
  options: {},
});

const genre: Ref<Object> = ref({});

watch(genre, () =>
  runQuery(`
  SELECT decade, COUNT(movie_id) as count_movies 
  FROM (SELECT movie_id, FLOOR(year/10)*10 as decade FROM movies_genres LEFT JOIN movies on movies.id = movies_genres.movie_id WHERE genre LIKE '${genre.value.genre}') t 
  GROUP BY decade 
  ORDER BY decade
  `)
);

watch(result, () => {
  data.count_movies = result.value.map((row: Object) => row.count_movies);
  data.decades = result.value.map((row: Object) => row.decade);

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
      categories: data.decades,
    },
  };
});
</script>
