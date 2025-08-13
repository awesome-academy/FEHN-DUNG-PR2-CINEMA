<script setup lang="ts">
import MovieList from "./MovieList.vue";
import GenreList from "./GenreList.vue";
import MovieScheduleList from "./MovieScheduleList.vue";
import TimeslotList from "./TimeslotList.vue";

defineProps<{
  activeTab: string;
}>();
</script>

<template>
  <div class="min-h-screen">
    <MovieList v-if="activeTab === 'movies'" />
    <GenreList v-if="activeTab === 'genres'" />
    <MovieScheduleList v-if="activeTab === 'movie-schedules'" />
    <TimeslotList v-if="activeTab === 'timeslots'" />
  </div>
</template>
