<script setup lang="ts">
import { X } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
}
defineProps<Props>();

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <!-- Backdrop -->
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-0 bg-black/50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <!-- Modal panel -->
    <div
      class="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#161b22] rounded-lg shadow-2xl"
    >
      <!-- Header -->
      <div
        class="bg-[#161b22] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-700"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
            Create New Cinema
          </h3>
          <button
            @click="emit('close')"
            class="text-gray-400 hover:text-gray-300 focus:outline-none"
            aria-label="Close"
          >
            <X class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-[#161b22]">
        <div class="px-4 py-5 sm:p-6 space-y-6">
          <!-- English Name -->
          <div>
            <label for="nameEn" class="block text-sm font-medium text-gray-300">
              Cinema Name (English) <span class="text-red-400">*</span>
            </label>
            <input
              id="nameEn"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter cinema name in English"
            />
          </div>

          <!-- Vietnamese Name -->
          <div>
            <label for="nameVi" class="block text-sm font-medium text-gray-300">
              Cinema Name (Vietnamese) <span class="text-red-400">*</span>
            </label>
            <input
              id="nameVi"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nhập tên rạp chiếu phim tiếng Việt"
            />
          </div>

          <!-- English Description -->
          <div>
            <label
              for="descriptionEn"
              class="block text-sm font-medium text-gray-300"
            >
              Description (English)
            </label>
            <textarea
              id="descriptionEn"
              rows="3"
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Enter cinema description in English"
            ></textarea>
          </div>

          <!-- Vietnamese Description -->
          <div>
            <label
              for="descriptionVi"
              class="block text-sm font-medium text-gray-300"
            >
              Description (Vietnamese)
            </label>
            <textarea
              id="descriptionVi"
              rows="3"
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              placeholder="Nhập mô tả rạp chiếu phim tiếng Việt"
            ></textarea>
          </div>

          <!-- Address -->
          <div>
            <label
              for="address"
              class="block text-sm font-medium text-gray-300"
            >
              Address <span class="text-red-400">*</span>
            </label>
            <input
              id="address"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full address"
            />
          </div>

          <!-- City -->
          <div>
            <label for="city" class="block text-sm font-medium text-gray-300">
              City <span class="text-red-400">*</span>
            </label>
            <input
              id="city"
              type="text"
              required
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter city name"
            />
          </div>

          <!-- Map URL -->
          <div>
            <label for="mapUrl" class="block text-sm font-medium text-gray-300">
              Map URL
            </label>
            <input
              id="mapUrl"
              type="url"
              class="mt-1 block w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://maps.google.com/..."
            />
          </div>
        </div>

        <!-- Footer -->
        <div
          class="bg-[#0d1117] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-700"
        >
          <button
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
          >
            Create Cinema
          </button>
          <button
            type="button"
            @click="emit('close')"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#161b22] text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for modal content */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}
.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
