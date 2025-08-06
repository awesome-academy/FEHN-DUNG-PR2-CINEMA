<script setup lang="ts">
import type { Cinema } from "~~/types/type";
import { ArrowLeft, MapPin, MapPinOff, CheckCircle } from "lucide-vue-next";

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

    <div v-if="cinemas.length === 0" class="text-center py-8">
      <MapPinOff class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-400">
        {{ t("buyTickets.selectCinema.noAvailable") }}
      </p>
    </div>

    <div v-else class="space-y-4">
      <button
        v-for="cinema in cinemas"
        :key="cinema.id"
        @click="handleCinemaSelect(cinema.id)"
        class="w-full p-6 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] text-left"
        :class="{
          'border-blue-500 bg-blue-500/20': selectedCinemaId === cinema.id,
          'border-gray-600 bg-gray-700/50 hover:border-gray-500':
            selectedCinemaId !== cinema.id,
        }"
      >
        <div class="flex items-start">
          <MapPin
            class="w-6 h-6 mr-4 mt-1"
            :class="{
              'text-blue-400': selectedCinemaId === cinema.id,
              'text-gray-400': selectedCinemaId !== cinema.id,
            }"
          />
          <div class="flex-1">
            <h3
              class="text-lg font-bold mb-2"
              :class="{
                'text-blue-400': selectedCinemaId === cinema.id,
                'text-white': selectedCinemaId !== cinema.id,
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
