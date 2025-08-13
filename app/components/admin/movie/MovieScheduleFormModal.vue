<script setup lang="ts">
import {
  X,
  Calendar,
  Save,
  Film,
  MapPin,
  Clock,
  Monitor,
} from "lucide-vue-next";
import { movies, cinemas, screens, timeSlots } from "~/data/sampleData";

interface Props {
  isOpen: boolean;
  schedule?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

// Form data
const formData = ref({
  movieId: null as number | null,
  cinemaId: null as number | null,
  screenId: null as number | null,
  timeSlotId: null as number | null,
});

// Available options for dropdowns
const availableMovies = computed(() => {
  return movies
    .map((movie) => ({
      id: movie.id,
      nameEn:
        movie.translations.find((t) => t.locale === "en")?.name ||
        "Unknown Movie",
      nameVi:
        movie.translations.find((t) => t.locale === "vi")?.name ||
        "Unknown Movie",
      status: movie.status,
    }))
    .filter((movie) => movie.status !== "ended"); // Only show active movies
});

const availableCinemas = computed(() => {
  return cinemas.map((cinema) => ({
    id: cinema.id,
    nameEn:
      cinema.translations.find((t) => t.locale === "en")?.name ||
      "Unknown Cinema",
    nameVi:
      cinema.translations.find((t) => t.locale === "vi")?.name ||
      "Unknown Cinema",
  }));
});

const availableScreens = computed(() => {
  if (!formData.value.cinemaId) return [];

  return screens
    .filter((screen) => screen.cinemaId === formData.value.cinemaId)
    .map((screen) => ({
      id: screen.id,
      name: screen.name,
      type: screen.type,
      capacity: screen.capacity,
    }));
});

const availableTimeSlots = computed(() => {
  return timeSlots
    .map((slot) => ({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      date: slot.date,
      displayTime: `${slot.startTime} - ${slot.endTime}`,
      displayDate: formatDate(slot.date),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

// Helper functions
const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
};

const getMovieById = (id: number | null) => {
  if (!id) return null;
  return availableMovies.value.find((m) => m.id === id);
};

const getCinemaById = (id: number | null) => {
  if (!id) return null;
  return availableCinemas.value.find((c) => c.id === id);
};

const getScreenById = (id: number | null) => {
  if (!id) return null;
  return availableScreens.value.find((s) => s.id === id);
};

const getTimeSlotById = (id: number | null) => {
  if (!id) return null;
  return availableTimeSlots.value.find((t) => t.id === id);
};

// Watch for schedule changes to populate form
watch(
  () => props.schedule,
  (schedule) => {
    if (schedule) {
      formData.value = {
        movieId: schedule.movieId || null,
        cinemaId: schedule.cinemaId || null,
        screenId: schedule.screenId || null,
        timeSlotId: schedule.timeSlotId || null,
      };
    } else {
      // Reset form for new schedule
      formData.value = {
        movieId: null,
        cinemaId: null,
        screenId: null,
        timeSlotId: null,
      };
    }
  },
  { immediate: true }
);

// Reset screen when cinema changes
watch(
  () => formData.value.cinemaId,
  (newCinemaId, oldCinemaId) => {
    if (newCinemaId !== oldCinemaId) {
      formData.value.screenId = null;
    }
  }
);

const isEditing = computed(() => !!props.schedule);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Movie Schedule" : "Add New Movie Schedule"
);

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.movieId &&
    formData.value.cinemaId &&
    formData.value.screenId &&
    formData.value.timeSlotId
  );
});

const handleSave = () => {
  if (!isFormValid.value) {
    const toast = useToast();
    toast.error({
      message: "Please fill in all required fields",
      position: "topCenter",
    });
    return;
  }

  // Simulate save action with toast notification
  const toast = useToast();
  const movie = getMovieById(formData.value.movieId);
  const cinema = getCinemaById(formData.value.cinemaId);
  const timeSlot = getTimeSlotById(formData.value.timeSlotId);

  const scheduleName = movie
    ? `${movie.nameEn} at ${cinema?.nameEn} on ${timeSlot?.displayDate}`
    : "Schedule";

  toast.success({
    message: isEditing.value
      ? `${scheduleName} updated successfully!`
      : `${scheduleName} created successfully!`,
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
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[65vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Movie Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Movie *
            </label>
            <select
              v-model="formData.movieId"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option :value="null">Select a movie</option>
              <option
                v-for="movie in availableMovies"
                :key="movie.id"
                :value="movie.id"
              >
                {{ movie.nameEn }} ({{ movie.nameVi }})
                <span
                  v-if="movie.status === 'coming_soon'"
                  class="text-yellow-400"
                >
                  - Coming Soon</span
                >
                <span
                  v-else-if="movie.status === 'now_showing'"
                  class="text-green-400"
                >
                  - Now Showing</span
                >
              </option>
            </select>
          </div>

          <!-- Cinema Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Cinema *
            </label>
            <select
              v-model="formData.cinemaId"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option :value="null">Select a cinema</option>
              <option
                v-for="cinema in availableCinemas"
                :key="cinema.id"
                :value="cinema.id"
              >
                {{ cinema.nameEn }} ({{ cinema.nameVi }})
              </option>
            </select>
          </div>

          <!-- Screen Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Screen *
            </label>
            <select
              v-model="formData.screenId"
              required
              :disabled="!formData.cinemaId"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option :value="null">
                {{
                  formData.cinemaId
                    ? "Select a screen"
                    : "Select a cinema first"
                }}
              </option>
              <option
                v-for="screen in availableScreens"
                :key="screen.id"
                :value="screen.id"
              >
                {{ screen.name }} ({{ screen.type }},
                {{ screen.capacity }} seats)
              </option>
            </select>
          </div>

          <!-- Time Slot Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Date & Time *
            </label>
            <select
              v-model="formData.timeSlotId"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option :value="null">Select date and time</option>
              <option
                v-for="slot in availableTimeSlots"
                :key="slot.id"
                :value="slot.id"
              >
                {{ slot.displayDate }} - {{ slot.displayTime }}
              </option>
            </select>
          </div>

          <!-- Preview Section -->
          <div
            v-if="
              formData.movieId &&
              formData.cinemaId &&
              formData.screenId &&
              formData.timeSlotId
            "
            class="bg-[#0d1117] border border-gray-600 rounded-md p-4"
          >
            <h4 class="text-sm font-medium text-gray-300 mb-3">Preview</h4>
            <div class="space-y-3">
              <!-- Movie Info -->
              <div class="flex items-center space-x-3">
                <Film class="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <div class="text-white font-medium">
                    {{ getMovieById(formData.movieId)?.nameEn }}
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ getMovieById(formData.movieId)?.nameVi }}
                  </div>
                </div>
              </div>

              <!-- Cinema & Screen Info -->
              <div class="flex items-center space-x-3">
                <MapPin class="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <div class="text-white font-medium">
                    {{ getCinemaById(formData.cinemaId)?.nameEn }}
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ getCinemaById(formData.cinemaId)?.nameVi }}
                  </div>
                </div>
              </div>

              <!-- Screen Info -->
              <div class="flex items-center space-x-3">
                <Monitor class="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <div class="text-white font-medium">
                    Screen: {{ getScreenById(formData.screenId)?.name }}
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ getScreenById(formData.screenId)?.type }} ({{
                      getScreenById(formData.screenId)?.capacity
                    }}
                    seats)
                  </div>
                </div>
              </div>

              <!-- Time Slot Info -->
              <div class="flex items-center space-x-3">
                <Clock class="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div>
                  <div class="text-white font-medium">
                    {{ getTimeSlotById(formData.timeSlotId)?.displayDate }}
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ getTimeSlotById(formData.timeSlotId)?.displayTime }}
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
          :disabled="!isFormValid"
          :class="[
            'w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors',
            isFormValid
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-500 cursor-not-allowed',
          ]"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ isEditing ? "Update Schedule" : "Create Schedule" }}
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
