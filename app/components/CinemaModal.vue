<script setup lang="ts">
import type { CinemaResult } from "~/composables/useCinemas";

interface Props {
  cinema: CinemaResult;
  show: boolean;
}

interface Emits {
  (e: "close"): void;
}

const { t, locale } = useI18n();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const closeModal = () => {
  emit("close");
};

const handleBackdropClick = (event: Event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75"
      @click="handleBackdropClick"
    >
      <div
        class="bg-gray-900 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        @click.stop
      >
        <!-- Modal Header -->
        <div
          class="flex justify-between items-center p-6 border-b border-gray-700"
        >
          <h2 class="text-2xl font-bold text-white">
            {{ t("cinemaModal.title") }}
          </h2>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 transition-colors"
          >
            ×
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6">
          <!-- Cinema Information -->
          <div class="mb-6">
            <h3 class="text-3xl font-bold text-blue-400 mb-4">
              {{ cinema.name }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 class="text-lg font-semibold text-white mb-2">
                  {{ t("cinemaModal.description") }}
                </h4>
                <p class="text-gray-300 leading-relaxed">
                  {{ cinema.description }}
                </p>
              </div>

              <div class="space-y-3">
                <div>
                  <h4 class="text-lg font-semibold text-white mb-1">
                    {{ t("cinemaModal.address") }}
                  </h4>
                  <p class="text-gray-300">{{ cinema.address }}</p>
                </div>

                <div>
                  <h4 class="text-lg font-semibold text-white mb-1">
                    {{ t("cinemaModal.city") }}
                  </h4>
                  <p class="text-gray-300">{{ cinema.city }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Map Section -->
          <div class="mb-6">
            <h4 class="text-lg font-semibold text-white mb-3">
              {{ t("cinemaModal.location") }}
            </h4>
            <div class="rounded-lg overflow-hidden border border-gray-700">
              <iframe
                :src="cinema.mapUrl"
                width="100%"
                height="400"
                style="border: 0"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full"
              ></iframe>
            </div>
            <p class="text-sm text-gray-400 mt-2">
              Map will be loaded with the specific location coordinates
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              @click="closeModal"
              class="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Custom scrollbar for the modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #374151;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #6b7280;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
