<script setup lang="ts">
import { computed, ref, watch, onMounted } from "vue";
import { useCinemas, type CinemaResult } from "~/composables/useCinemas";
import AllCities from "../components/AllCities.vue";
import AllCinemas from "../components/AllCinemas.vue";
import CinemaModal from "../components/CinemaModal.vue";

const { t, locale } = useI18n();
const { cinemas: translatedCinemas } = useCinemas(locale);

const selectedCity = ref("");
const selectedCinema = ref<CinemaResult | null>(null);
const showModal = ref(false);

const getAllCities = computed(() => {
  const allCities = translatedCinemas.value.map((cinema) => cinema.city);
  return Array.from(new Set(allCities));
});

const getCinemasByCity = computed(() => {
  const allCinemas = translatedCinemas.value.filter(
    (cinema) => cinema.city === selectedCity.value
  );
  return allCinemas;
});

const handleCitySelect = (city: string) => {
  selectedCity.value = city;
};

const handleCinemaSelect = (cinema: CinemaResult) => {
  selectedCinema.value = cinema;
  showModal.value = true;
};

const handleCloseModal = () => {
  showModal.value = false;
  selectedCinema.value = null;
};
</script>

<template>
  <div class="h-screen overflow-y-scroll bg-black text-white">
    <Navbar />
    <div class="container">
      <AllCities
        :cities="getAllCities"
        :selectedCity="selectedCity"
        @select-city="handleCitySelect"
      />

      <AllCinemas
        v-if="selectedCity"
        :cinemas="getCinemasByCity"
        :selectedCity="selectedCity"
        @select-cinema="handleCinemaSelect"
      />

      <CinemaModal
        v-if="showModal && selectedCinema"
        :cinema="selectedCinema"
        :show="showModal"
        @close="handleCloseModal"
      />
    </div>
  </div>
</template>

<style scoped></style>
