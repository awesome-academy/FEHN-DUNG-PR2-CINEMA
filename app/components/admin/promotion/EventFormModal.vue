<script setup lang="ts">
import { X, Save, Calendar } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
  event?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const formData = ref({
  nameEn: "",
  nameVi: "",
  descriptionEn: "",
  descriptionVi: "",
  termsEn: "",
  termsVi: "",
  code: "",
  type: "",
  startDate: "",
  endDate: "",
  status: "active",
  image: "",
});

const formatDateForInput = (dateString?: string) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
};

watch(
  () => props.event,
  (event) => {
    if (event) {
      formData.value = {
        nameEn: event.translated?.en?.name ?? "",
        nameVi: event.translated?.vi?.name ?? "",
        descriptionEn: event.translated?.en?.description ?? "",
        descriptionVi: event.translated?.vi?.description ?? "",
        termsEn: event.translated?.en?.terms ?? "",
        termsVi: event.translated?.vi?.terms ?? "",
        code: event.code ?? "",
        type: event.type ?? "",
        startDate: formatDateForInput(event.startDate) as string,
        endDate: formatDateForInput(event.endDate) as string,
        status: event.status ?? "active",
        image: event.image ?? "",
      };
    } else {
      formData.value = {
        nameEn: "",
        nameVi: "",
        descriptionEn: "",
        descriptionVi: "",
        termsEn: "",
        termsVi: "",
        code: "",
        type: "",
        startDate: "",
        endDate: "",
        status: "active",
        image: "",
      };
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.event);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Event" : "Add New Event"
);

const handleSave = () => {
  const toast = useToast();
  const eventName = formData.value.nameEn || "Event";

  toast.success({
    message: isEditing.value
      ? `${eventName} updated successfully!`
      : `${eventName} created successfully!`,
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
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[800px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Calendar class="w-6 h-6 text-blue-500 mr-3" />
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
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[70vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Event Code -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Event Code *
              </label>
              <input
                type="text"
                v-model="formData.code"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., SUMMER2024"
              />
            </div>

            <!-- Event Type -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Event Type *
              </label>
              <select
                v-model="formData.type"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="discount">Discount</option>
                <option value="combo">Combo</option>
                <option value="special_screening">Special Screening</option>
                <option value="giveaway">Giveaway</option>
              </select>
            </div>
          </div>

          <!-- Event Names -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Event Name (English) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Event Name (English) *
              </label>
              <input
                type="text"
                v-model="formData.nameEn"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter English event name"
              />
            </div>

            <!-- Event Name (Vietnamese) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Event Name (Vietnamese) *
              </label>
              <input
                type="text"
                v-model="formData.nameVi"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Vietnamese event name"
              />
            </div>
          </div>

          <!-- Descriptions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Description (English) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Description (English) *
              </label>
              <textarea
                v-model="formData.descriptionEn"
                required
                rows="4"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter English description"
              ></textarea>
            </div>

            <!-- Description (Vietnamese) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Description (Vietnamese) *
              </label>
              <textarea
                v-model="formData.descriptionVi"
                required
                rows="4"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter Vietnamese description"
              ></textarea>
            </div>
          </div>

          <!-- Terms & Conditions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Terms (English) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Terms & Conditions (English)
              </label>
              <textarea
                v-model="formData.termsEn"
                rows="3"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter English terms & conditions"
              ></textarea>
            </div>

            <!-- Terms (Vietnamese) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Terms & Conditions (Vietnamese)
              </label>
              <textarea
                v-model="formData.termsVi"
                rows="3"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                placeholder="Enter Vietnamese terms & conditions"
              ></textarea>
            </div>
          </div>

          <!-- Date Range -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Start Date -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                v-model="formData.startDate"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- End Date -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                End Date *
              </label>
              <input
                type="date"
                v-model="formData.endDate"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Status and Image -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Status *
              </label>
              <select
                v-model="formData.status"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            <!-- Image URL -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                v-model="formData.image"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/event-image.jpg"
              />
            </div>
          </div>

          <!-- Image Preview -->
          <div v-if="formData.image" class="mt-4">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Image Preview
            </label>
            <div
              class="w-32 h-24 border border-gray-600 rounded-md overflow-hidden bg-[#0d1117]"
            >
              <img
                :src="formData.image"
                :alt="formData.nameEn"
                class="w-full h-full object-cover"
              />
            </div>
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
          {{ isEditing ? "Update Event" : "Create Event" }}
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
