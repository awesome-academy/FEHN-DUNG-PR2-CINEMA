<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { Cinema } from "~~/types/type";
import { MapPin, Heart, HeartOff, X } from "lucide-vue-next";
import { useCinemaStore } from "~/stores/cinema";

const { t, locale } = useI18n();
const toast = useToast();
const cinemaStore = useCinemaStore();

// Get all cinemas from the store
const allCinemas = computed(() => cinemaStore.allCinemas);

// Get cities for filtering
const cities = computed(() => {
  const uniqueCities = [
    ...new Set(allCinemas.value.map((cinema) => cinema.city)),
  ];
  return uniqueCities;
});

const selectedCity = ref("");
const showCinemaSelection = ref(false);

// Initialize with first city if available
onMounted(() => {
  cinemaStore.restoreFavoriteCinemaFromLocal();
  if (cities.value.length > 0) {
    selectedCity.value = cities.value[0] as string;
  }
});

// Filter cinemas by selected city
const filteredCinemas = computed(() => {
  if (!selectedCity.value) return allCinemas.value;
  return allCinemas.value.filter(
    (cinema) => cinema.city === selectedCity.value
  );
});

// Get current favorite cinema details
const favoriteCinema = computed(() => {
  const favoriteId = cinemaStore.favoriteCinemaId;
  if (!favoriteId) return null;

  const cinema = allCinemas.value.find((c) => c.id === favoriteId);
  if (!cinema) return null;

  const translation =
    cinema.translations.find((t) => t.locale === locale.value) ||
    cinema.translations[0];

  return {
    id: cinema.id,
    name: translation?.name || "",
    description: translation?.description || "",
    address: cinema.address,
    city: cinema.city,
    mapUrl: cinema.mapUrl,
  };
});

const currentFavoriteCinemaId = computed(() => {
  return cinemaStore.favoriteCinemaId;
});

// Helper functions
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

const handleCitySelect = (city: string) => {
  selectedCity.value = city;
};

const handleSetFavorite = (cinemaId: number) => {
  cinemaStore.setFavoriteCinema(cinemaId);
  showCinemaSelection.value = false;

  const cinema = allCinemas.value.find((c) => c.id === cinemaId);
  const cinemaName = cinema ? getCinemaName(cinema) : "";

  toast.success({
    message: t("account.favoriteCinema.setSuccess", { cinema: cinemaName }),
    position: "topCenter",
  });
};

const handleRemoveFavorite = () => {
  cinemaStore.clearFavoriteCinema();
  toast.info?.({
    message: t("account.favoriteCinema.removeSuccess"),
    position: "topCenter",
  });
};

const toggleCinemaSelection = () => {
  showCinemaSelection.value = !showCinemaSelection.value;
};
</script>

<template>
  <div class="space-y-4">
    <!-- Title Section -->
    <h2 class="text-lg font-medium text-white mb-4">
      {{ $t("account.favoriteCinema.title") }}
    </h2>

    <!-- Current Favorite Cinema Display -->
    <div v-if="favoriteCinema" class="space-y-4">
      <!-- Cinema Card -->
      <div class="bg-[#2d3748] rounded-lg p-4 border-2 border-blue-500">
        <div class="flex items-start">
          <MapPin class="w-5 h-5 text-blue-500 mt-1 mr-3" />
          <div class="flex-1">
            <h4 class="text-white font-medium mb-1">
              {{ favoriteCinema.name }}
            </h4>
            <p class="text-gray-400 text-sm mb-2">
              {{ favoriteCinema.description }}
            </p>
            <div class="flex items-center text-gray-400 text-sm">
              <MapPin class="w-3 h-3 mr-1" />
              <span
                >{{ favoriteCinema.address }}, {{ favoriteCinema.city }}</span
              >
            </div>
          </div>
        </div>
        <div class="mt-3 flex items-center text-blue-500 text-sm">
          <Heart class="w-4 h-4 mr-2" />
          <span>{{ $t("account.favoriteCinema.current") }}</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-3">
        <button
          @click="toggleCinemaSelection"
          class="flex-1 bg-transparent border border-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center"
        >
          <Heart class="w-4 h-4 mr-2" />
          {{ $t("account.favoriteCinema.change") }}
        </button>
        <button
          @click="handleRemoveFavorite"
          class="flex-1 bg-transparent border border-red-600 text-red-400 py-3 px-6 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center"
        >
          <HeartOff class="w-4 h-4 mr-2" />
          {{ $t("account.favoriteCinema.remove") }}
        </button>
      </div>
    </div>

    <!-- No Favorite Cinema -->
    <div v-else class="space-y-4">
      <!-- Empty state -->
      <div
        class="text-center py-8 border-2 border-dashed border-gray-600 rounded-lg"
      >
        <HeartOff class="w-8 h-8 text-gray-500 mx-auto mb-3" />
        <h3 class="text-gray-400 mb-2">
          {{ $t("account.favoriteCinema.noFavorite") }}
        </h3>
        <p class="text-gray-500 text-sm">
          {{ $t("account.favoriteCinema.selectBenefit") }}
        </p>
      </div>

      <!-- Select Button -->
      <button
        @click="toggleCinemaSelection"
        class="w-full bg-transparent border border-blue-500 text-blue-500 py-3 px-6 rounded-lg font-medium hover:bg-blue-500 hover:text-white transition-colors flex items-center justify-center"
      >
        <Heart class="w-4 h-4 mr-2" />
        {{ $t("account.favoriteCinema.select") }}
      </button>
    </div>

    <!-- Cinema Selection Modal/Panel -->
    <div v-if="showCinemaSelection" class="space-y-4">
      <!-- Header with close -->
      <div class="flex items-center justify-between">
        <h3 class="text-white font-medium">
          {{ $t("account.favoriteCinema.selectCinema") }}
        </h3>
        <button
          @click="toggleCinemaSelection"
          class="text-gray-400 hover:text-white transition-colors p-1"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <!-- City Selection Tabs -->
      <div v-if="cities.length > 1" class="flex space-x-1">
        <button
          v-for="city in cities"
          :key="city"
          @click="handleCitySelect(city)"
          class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          :class="{
            'bg-blue-600 text-white': selectedCity === city,
            'bg-gray-700 text-gray-300 hover:bg-gray-600':
              selectedCity !== city,
          }"
        >
          {{ city }}
        </button>
      </div>

      <!-- Cinema List -->
      <div class="space-y-3 max-h-80 overflow-y-auto">
        <button
          v-for="cinema in filteredCinemas"
          :key="cinema.id"
          @click="handleSetFavorite(cinema.id)"
          class="w-full p-4 rounded-lg border transition-all text-left hover:border-gray-500"
          :class="{
            'border-blue-500 bg-blue-500/10':
              currentFavoriteCinemaId === cinema.id,
            'border-gray-600 bg-[#2d3748]':
              currentFavoriteCinemaId !== cinema.id,
          }"
        >
          <div class="flex items-start">
            <MapPin
              class="w-4 h-4 mt-1 mr-3"
              :class="{
                'text-blue-500': currentFavoriteCinemaId === cinema.id,
                'text-gray-400': currentFavoriteCinemaId !== cinema.id,
              }"
            />
            <div class="flex-1">
              <h4
                class="font-medium mb-1"
                :class="{
                  'text-blue-400': currentFavoriteCinemaId === cinema.id,
                  'text-white': currentFavoriteCinemaId !== cinema.id,
                }"
              >
                {{ getCinemaName(cinema) }}
              </h4>
              <p class="text-gray-400 text-sm mb-2">
                {{ getCinemaDescription(cinema) }}
              </p>
              <div class="flex items-center text-gray-500 text-xs">
                <MapPin class="w-3 h-3 mr-1" />
                <span>{{ cinema.address }}, {{ cinema.city }}</span>
              </div>
              <div
                v-if="currentFavoriteCinemaId === cinema.id"
                class="mt-2 text-blue-500 text-xs"
              >
                {{ $t("account.favoriteCinema.current") }}
              </div>
            </div>
          </div>
        </button>
      </div>

      <!-- Remove favorite option if one exists -->
      <button
        v-if="favoriteCinema && showCinemaSelection"
        @click="handleRemoveFavorite"
        class="w-full bg-transparent border border-gray-600 text-gray-400 py-2 px-4 rounded-lg text-sm hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-center"
      >
        <HeartOff class="w-4 h-4 mr-2" />
        {{ $t("account.favoriteCinema.remove") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for cinema list */
.max-h-80::-webkit-scrollbar {
  width: 4px;
}

.max-h-80::-webkit-scrollbar-track {
  background: #2d3748;
  border-radius: 2px;
}

.max-h-80::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 2px;
}

.max-h-80::-webkit-scrollbar-thumb:hover {
  background: #718096;
}
</style>
