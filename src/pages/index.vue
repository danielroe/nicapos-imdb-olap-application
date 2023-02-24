<template>
  <section class="grid gap-4 p-12">
    <h1 class="text-4xl font-bold tracking-tight">Welcome to the OLAP Application Title</h1>
    <p>
      This platform presents data from an IMDb dataset using easy-to-read charts and diagrams. Explore and gain insights
      into the dataset using one of the following pre-defined categories below.
    </p>
  </section>

  <section class="flex w-full flex-row gap-8 px-12 text-justify leading-5 text-gray-900">
    <div class="grid max-w-sm gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h3 class="text-2xl font-bold tracking-tight">Actors</h3>
      <p class="text-justify">List of movies featuring actors based on a time frame.</p>

      <ul class="grid max-w-md gap-1 space-y-1">
        <li>
          <NuxtLink to="actors/movies_per_year" class="font-medium text-blue-600 hover:underline">
            Movies per year
          </NuxtLink>
          - explore the annual count of movies featuring an actor
        </li>
        <li>
          <NuxtLink to="actors/movies_per_decade" class="font-medium text-blue-600 hover:underline">
            Movies per decade
          </NuxtLink>
          - view the count of movies an actor has starred in through the decades
        </li>
      </ul>
    </div>

    <div class="grid max-w-sm gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h3 class="text-2xl font-bold tracking-tight">Genres</h3>
      <p class="text-justify">List of movies according to genre based on a time frame.</p>

      <ul class="grid max-w-md gap-1 space-y-1">
        <li>
          <NuxtLink to="genres/movies_per_year" class="font-medium text-blue-600 hover:underline">
            Movies per year
          </NuxtLink>
          - explore the annual count of movies in a genre
        </li>
        <li>
          <NuxtLink to="genres/movies_per_decade" class="font-medium text-blue-600 hover:underline">
            Movies per decade
          </NuxtLink>
          - explore movies in a genre through the decades
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
