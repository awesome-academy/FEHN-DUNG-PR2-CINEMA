<script setup lang="ts">
import { X } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
}

defineProps<Props>();
defineEmits<{
  close: [];
}>();
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/75 overflow-y-auto"
    @click="$emit('close')"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Modal panel -->
      <div
        class="inline-block align-bottom bg-[#161b22] rounded-lg border border-gray-700 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
      >
        <!-- Header -->
        <div
          class="bg-[#161b22] px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-700"
        >
          <div class="flex items-center justify-between">
            <h3
              class="text-lg leading-6 font-medium text-white"
              id="modal-title"
            >
              Create New Cinema
            </h3>
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-300 focus:outline-none"
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
              <label
                for="nameEn"
                class="block text-sm font-medium text-gray-300"
              >
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
              <label
                for="nameVi"
                class="block text-sm font-medium text-gray-300"
              >
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
              <label
                for="mapUrl"
                class="block text-sm font-medium text-gray-300"
              >
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
              @click="$emit('close')"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#161b22] text-base font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
