<template>
  <section class="grid gap-4 px-8 py-12 md:px-12">
    <h1 class="text-4xl font-bold tracking-tight">Welcome to the OLAP Application Title</h1>
    <p>
      This platform presents data from an IMDb dataset using easy-to-read charts and diagrams. Explore and gain insights
      into the dataset using one of the following pre-defined categories below.
    </p>
  </section>

  <section
    class="grid w-full grid-cols-1 justify-center gap-8 px-8 text-justify leading-5 text-gray-900 sm:grid-cols-2 md:px-12 lg:grid-cols-3"
  >
    <div class="grid max-w-sm content-start gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h3 class="text-center text-2xl font-bold tracking-tight">Actors</h3>
      <p class="text-justify">Number of movies featuring actors based on a time frame.</p>

      <ul class="grid max-w-md gap-1 space-y-1">
        <li>
          <NuxtLink to="/actors/movies?period=year" class="font-medium text-blue-600 hover:underline">
            Movies per year
          </NuxtLink>
          - explore the annual count of movies featuring an actor
        </li>
        <li>
          <NuxtLink to="/actors/movies?period=decade" class="font-medium text-blue-600 hover:underline">
            Movies per decade
          </NuxtLink>
          - view the count of movies an actor has starred in through the decades
        </li>
        <li>
          <NuxtLink to="/actors/movies?period=century" class="font-medium text-blue-600 hover:underline">
            Movies per century
          </NuxtLink>
          - see the number of movies in which an actor has appeared across various centuries
        </li>
      </ul>
    </div>

    <div class="grid max-w-sm content-start gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h3 class="text-center text-2xl font-bold tracking-tight">Genres</h3>
      <p class="text-justify">Determine the number of movies per genre within a specific time period.</p>

      <ul class="grid max-w-md gap-1 space-y-1">
        <li>
          <NuxtLink to="/genres/movies?period=year" class="font-medium text-blue-600 hover:underline">
            Movies per year
          </NuxtLink>
          - explore the annual count of movies in a genre
        </li>
        <li>
          <NuxtLink to="/genres/movies?period=decade" class="font-medium text-blue-600 hover:underline">
            Movies per decade
          </NuxtLink>
          - view the count of movies in a genre in through the decades
        </li>
        <li>
          <NuxtLink to="/genres/movies?period=century" class="font-medium text-blue-600 hover:underline">
            Movies per century
          </NuxtLink>
          - see the number of movies in a genre across various centuries
        </li>
      </ul>
    </div>

    <div class="grid max-w-sm content-start gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h3 class="text-center text-2xl font-bold tracking-tight">Genres</h3>
      <p class="text-justify">Compare the performance of different genres based on a time frame.</p>

      <ul class="grid max-w-md gap-1 space-y-1">
        <li>
          <NuxtLink to="/genres/ranking?period=year" class="font-medium text-blue-600 hover:underline">
            Ranking per year
          </NuxtLink>
          - explore the yearly average movie rankings for various genres
        </li>
        <li>
          <NuxtLink to="/genres/ranking?period=decade" class="font-medium text-blue-600 hover:underline">
            Ranking per decade
          </NuxtLink>
          - discover the average movie rankings per year across different genres
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({
  title: "OLAP Application Title",
});
</script>
