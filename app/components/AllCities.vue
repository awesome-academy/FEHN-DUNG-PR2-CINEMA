<script setup lang="ts">
interface Props {
  cities: string[];
  selectedCity: string;
}

interface Emits {
  (e: "select-city", city: string): void;
}

const { t, locale } = useI18n();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const selectCity = (city: string) => {
  emit("select-city", city);
};
</script>

<template>
  <div class="my-8">
    <h2 class="text-2xl font-semibold mb-6 text-center">
      {{ t("allCities.title") }}
    </h2>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <button
        v-for="city in cities"
        :key="city"
        @click="selectCity(city)"
        :class="[
          'p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105',
          selectedCity === city
            ? 'bg-blue-600 border-blue-600 text-white shadow-lg'
            : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500',
        ]"
      >
        <div class="text-lg font-medium">{{ city }}</div>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
