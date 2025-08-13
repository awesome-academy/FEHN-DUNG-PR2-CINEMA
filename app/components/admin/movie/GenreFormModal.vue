<script setup lang="ts">
import { X, Save } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
  genre?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const formData = ref({
  nameEn: "",
  nameVi: "",
});

watch(
  () => props.genre,
  (genre) => {
    if (genre) {
      formData.value = {
        nameEn: genre.translatedName.en.name || "",
        nameVi: genre.translatedName.vi.name || "",
      };
    } else {
      formData.value = {
        nameEn: "",
        nameVi: "",
      };
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.genre);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Genre" : "Add New Genre"
);

const handleSave = () => {
  const toast = useToast();
  const genreName = formData.value.nameEn || "Genre";

  toast.success({
    message: isEditing.value
      ? `${genreName} updated successfully!`
      : `${genreName} created successfully!`,
    position: "topCenter",
  });

  emit("close");
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    @click="handleClose"
  >
    <!-- Modal panel -->
    <div
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h3 class="text-lg leading-6 font-medium text-white">
              {{ modalTitle }}
            </h3>
          </div>
          <button
            @click="handleClose"
            class="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[60vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Genre Name (English) -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Genre Name (English) *
            </label>
            <input
              type="text"
              v-model="formData.nameEn"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter English genre name"
            />
          </div>

          <!-- Genre Name (Vietnamese) -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Genre Name (Vietnamese) *
            </label>
            <input
              type="text"
              v-model="formData.nameVi"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter Vietnamese genre name"
            />
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div
        class="bg-[#161b22] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-700"
      >
        <button
          @click="handleSave"
          class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ isEditing ? "Update Genre" : "Create Genre" }}
        </button>
        <button
          @click="handleClose"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#0d1117] text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
