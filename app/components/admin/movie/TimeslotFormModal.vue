<script setup lang="ts">
import { X, Clock, Save, Calendar } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
  timeslot?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const formData = ref({
  date: "",
  startTime: "",
  endTime: "",
});

const formatDateForInput = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  } catch {
    return "";
  }
};

const formatTimeForInput = (timeString: string) => {
  try {
    const [hours, minutes] = timeString.split(":");
    if (typeof hours === "undefined" || typeof minutes === "undefined") {
      return "";
    }
    return `${hours!.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  } catch {
    return "";
  }
};

const formatDateForDisplay = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  } catch {
    return dateString;
  }
};

const formatTimeForDisplay = (timeString: string) => {
  try {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours as string), parseInt(minutes as string));
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return timeString;
  }
};

watch(
  () => props.timeslot,
  (timeslot) => {
    if (timeslot) {
      formData.value = {
        date: formatDateForInput(timeslot.date) as string,
        startTime: formatTimeForInput(timeslot.startTime),
        endTime: formatTimeForInput(timeslot.endTime),
      };
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      formData.value = {
        date: (() => {
          const isoString = tomorrow.toISOString();
          const parts = isoString.split("T");
          return parts.length > 0 ? parts[0] : "";
        })() as string,
        startTime: "09:00",
        endTime: "11:00",
      };
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.timeslot);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Timeslot" : "Add New Timeslot"
);

const timeOptions = computed(() => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      const displayTime = formatTimeForDisplay(timeString);
      options.push({
        value: timeString,
        label: `${timeString} (${displayTime})`,
      });
    }
  }
  return options;
});

const handleSave = () => {
  const toast = useToast();

  toast.success({
    message: isEditing.value
      ? `Timeslot updated successfully!`
      : `Timeslot created successfully!`,
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
            <Clock class="w-6 h-6 text-blue-500 mr-3" />
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
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[65vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Date Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <Calendar class="w-4 h-4 inline mr-1" />
              Date *
            </label>
            <input
              type="date"
              v-model="formData.date"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Start Time Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <Clock class="w-4 h-4 inline mr-1" />
              Start Time *
            </label>
            <select
              v-model="formData.startTime"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select start time</option>
              <option
                v-for="option in timeOptions"
                :key="`start-${option.value}`"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- End Time Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              <Clock class="w-4 h-4 inline mr-1" />
              End Time *
            </label>
            <select
              v-model="formData.endTime"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select end time</option>
              <option
                v-for="option in timeOptions"
                :key="`end-${option.value}`"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Preview Section -->
          <div
            v-if="formData.date && formData.startTime && formData.endTime"
            class="bg-[#0d1117] border border-gray-600 rounded-md p-4"
          >
            <h4 class="text-sm font-medium text-gray-300 mb-3">Preview</h4>
            <div class="space-y-3">
              <!-- Date Info -->
              <div class="flex items-center space-x-3">
                <Calendar class="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div class="text-white font-medium">
                    {{ formatDateForDisplay(formData.date) }}
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ formData.date }}
                  </div>
                </div>
              </div>

              <!-- Time Range Info -->
              <div class="flex items-center space-x-3">
                <Clock class="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <div class="text-white font-medium">
                    {{ formatTimeForDisplay(formData.startTime) }} -
                    {{ formatTimeForDisplay(formData.endTime) }}
                  </div>
                </div>
              </div>
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
          class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors bg-blue-500 hover:bg-blue-600"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ isEditing ? "Update Timeslot" : "Create Timeslot" }}
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
