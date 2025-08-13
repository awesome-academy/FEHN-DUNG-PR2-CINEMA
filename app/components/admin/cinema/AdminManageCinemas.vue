<script setup lang="ts">
import CinemaList from "./CinemaList.vue";
import ScreenList from "./ScreenList.vue";
import SeatList from "./SeatList.vue";

interface Props {
  activeTab: string;
}

defineProps<Props>();
</script>

<template>
  <div class="p-4 md:p-6">
    <CinemaList v-if="activeTab === 'cinemas'" />
    <ScreenList v-if="activeTab === 'screens'" />
    <SeatList v-if="activeTab === 'seats'" />
  </div>
</template>

<style scoped></style>
