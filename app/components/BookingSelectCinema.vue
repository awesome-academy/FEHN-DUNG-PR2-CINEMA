<script setup lang="ts">
import type { Cinema } from "~~/types/type";
import {
  ArrowLeft,
  MapPin,
  MapPinOff,
  CheckCircle,
  Heart,
} from "lucide-vue-next";
import { computed, ref } from "vue";
import { useCinemaStore } from "~/stores/cinema";

interface Props {
  cinemas: Cinema[];
  selectedCinemaId: number | null;
}

interface Emits {
  (e: "select", cinemaId: number): void;
  (e: "back"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t, locale } = useI18n();
const cinemaStore = useCinemaStore();

const cities = computed(() => {
  const uniqueCities = [...new Set(props.cinemas.map((cinema) => cinema.city))];
  return uniqueCities;
});

const selectedCity = ref("");

watch(
  () => [props.cinemas, cinemaStore.favoriteCinemaId] as const,
  ([newCinemas, favId]) => {
    if (!newCinemas || newCinemas.length === 0) return;

    const favoriteCinema = newCinemas.find((c) => c.id === favId);
    if (favoriteCinema) {
      selectedCity.value = favoriteCinema.city;
      return;
    }

    if (!selectedCity.value && cities.value.length > 0) {
      selectedCity.value = cities.value[0] as string;
    }
  },
  { immediate: true }
);

const filteredCinemas = computed(() => {
  return props.cinemas.filter((cinema) => cinema.city === selectedCity.value);
});

const getCinemaName = (cinema: Cinema) => {
  const translation = cinema.translations.find(
    (t) => t.locale === locale.value
  );
  return translation?.name || cinema.translations[0]?.name || "Unknown Cinema";
};

const getCinemaDescription = (cinema: Cinema) => {
  const translation = cinema.translations.find(
    (t) => t.locale === locale.value
  );
  return translation?.description || cinema.translations[0]?.description || "";
};

const handleCinemaSelect = (cinemaId: number) => {
  emit("select", cinemaId);
};

const handleBack = () => {
  emit("back");
};

const handleCitySelect = (city: string) => {
  selectedCity.value = city;
};

const isFavoriteCinema = (cinemaId: number) => {
  return cinemaStore.favoriteCinemaId === cinemaId;
};
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">
        {{ t("buyTickets.selectCinema.title") }}
      </h2>
      <button
        @click="handleBack"
        class="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        {{ t("buyTickets.common.back") }}
      </button>
    </div>

    <!-- City Selection Buttons -->
    <div v-if="cities.length > 1" class="mb-6">
      <div class="flex flex-wrap gap-3">
        <button
          v-for="city in cities"
          :key="city"
          @click="handleCitySelect(city)"
          class="px-4 py-2 rounded-lg font-medium transition-all duration-300"
          :class="{
            'bg-blue-500 text-white': selectedCity === city,
            'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white':
              selectedCity !== city,
          }"
        >
          {{ city }}
        </button>
      </div>
    </div>

    <div v-if="filteredCinemas.length === 0" class="text-center py-8">
      <MapPinOff class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-400">
        {{ t("buyTickets.selectCinema.noAvailable") }}
      </p>
    </div>

    <div v-else class="space-y-4">
      <button
        v-for="cinema in filteredCinemas"
        :key="cinema.id"
        @click="handleCinemaSelect(cinema.id)"
        class="w-full p-6 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] text-left relative"
        :class="{
          'border-blue-500 bg-blue-500/20': selectedCinemaId === cinema.id,
          'border-amber-500 bg-amber-500/20':
            isFavoriteCinema(cinema.id) && selectedCinemaId !== cinema.id,
          'border-gray-600 bg-gray-700/50 hover:border-gray-500':
            selectedCinemaId !== cinema.id && !isFavoriteCinema(cinema.id),
        }"
      >
        <!-- Favorite Badge -->
        <div
          v-if="isFavoriteCinema(cinema.id)"
          class="absolute top-3 right-3 flex items-center bg-amber-500/20 border border-amber-500 rounded-full px-3 py-1"
        >
          <Heart class="w-4 h-4 mr-1 text-amber-400 fill-current" />
          <span class="text-xs font-medium text-amber-400">Favorite</span>
        </div>

        <div class="flex items-start">
          <MapPin
            class="w-6 h-6 mr-4 mt-1"
            :class="{
              'text-blue-400': selectedCinemaId === cinema.id,
              'text-amber-400':
                isFavoriteCinema(cinema.id) && selectedCinemaId !== cinema.id,
              'text-gray-400':
                selectedCinemaId !== cinema.id && !isFavoriteCinema(cinema.id),
            }"
          />
          <div class="flex-1 pr-16">
            <h3
              class="text-lg font-bold mb-2"
              :class="{
                'text-blue-400': selectedCinemaId === cinema.id,
                'text-amber-400':
                  isFavoriteCinema(cinema.id) && selectedCinemaId !== cinema.id,
                'text-white':
                  selectedCinemaId !== cinema.id &&
                  !isFavoriteCinema(cinema.id),
              }"
            >
              {{ getCinemaName(cinema) }}
            </h3>
            <p class="text-gray-400 mb-2">
              {{ getCinemaDescription(cinema) }}
            </p>
            <div class="flex items-center text-gray-500">
              <MapPin class="w-4 h-4 mr-1" />
              <span>{{ cinema.address }}, {{ cinema.city }}</span>
            </div>
            <div
              v-if="selectedCinemaId === cinema.id"
              class="flex items-center mt-3 text-blue-400"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              <span class="">{{ t("buyTickets.common.selected") }}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
