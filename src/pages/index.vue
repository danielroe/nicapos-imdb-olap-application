<template>
  <section class="grid gap-4 p-12">
    <h1 class="text-4xl font-bold tracking-tight">Welcome to the OLAP Application Title</h1>
    <p>
      This platform presents data from an IMDb dataset using easy-to-read charts and diagrams. Explore and gain insights
      into the dataset using one of the following pre-defined categories below.
    </p>
  </section>

  <section class="grid w-full gap-8 px-12 text-justify leading-5 text-gray-900">
    <div class="grid max-w-sm gap-4 rounded-lg border border-gray-200 bg-white p-6 shadow">
      <h3 class="text-2xl font-bold tracking-tight">Actors</h3>
      <p class="text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sem eu vitae laoreet odio augue euismod neque.
      </p>

      <ul class="grid max-w-md gap-1 space-y-1">
        <li>
          <a href="#" class="font-medium text-blue-600 hover:underline">Movies per year</a>
          - explore the annual count of movies featuring an actor
        </li>
        <li>
          <a href="#" class="font-medium text-blue-600 hover:underline">Movies per decade</a>
          - view the count of movies an actor has starred in through the decades
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
