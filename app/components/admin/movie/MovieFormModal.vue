<script setup lang="ts">
import { X, Film, Save } from "lucide-vue-next";
import { useAdminManageMovies } from "~/composables/useAdminManageMovies";

interface Props {
  isOpen: boolean;
  movie?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const { allGenres } = useAdminManageMovies();

const formData = ref({
  nameEn: "",
  nameVi: "",
  briefEn: "",
  briefVi: "",
  descriptionEn: "",
  descriptionVi: "",
  code: "",
  duration: 0,
  posterImg: "",
  trailer: "",
  releaseDate: "",
  status: "coming_soon" as "coming_soon" | "now_showing" | "ended",
  directors: [] as string[],
  casts: [] as string[],
  genres: [] as number[],
  ratings: 0,
});

const directorsText = ref("");
const castsText = ref("");

watch(
  () => props.movie,
  (movie) => {
    if (movie) {
      formData.value = {
        nameEn: movie.translated.en.name || "",
        nameVi: movie.translated.vi.name || "",
        briefEn: movie.translated.en.brief || "",
        briefVi: movie.translated.vi.brief || "",
        descriptionEn: movie.translated.en.description || "",
        descriptionVi: movie.translated.vi.description || "",
        code: movie.code || "",
        duration: movie.duration || 0,
        posterImg: movie.posterImg || "",
        trailer: movie.trailer || "",
        releaseDate: movie.releaseDate || "",
        status: movie.status || "coming_soon",
        directors: [...(movie.directors || [])],
        casts: [...(movie.casts || [])],
        genres: [...(movie.genres || [])],
        ratings: movie.ratings || 0,
      };
      directorsText.value = movie.directors?.join(", ") || "";
      castsText.value = movie.casts?.join(", ") || "";
    } else {
      // Reset form for new movie
      formData.value = {
        nameEn: "",
        nameVi: "",
        briefEn: "",
        briefVi: "",
        descriptionEn: "",
        descriptionVi: "",
        code: "",
        duration: 0,
        posterImg: "",
        trailer: "",
        releaseDate: "",
        status: "coming_soon",
        directors: [],
        casts: [],
        genres: [],
        ratings: 0,
      };
      directorsText.value = "";
      castsText.value = "";
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.movie);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Movie" : "Add New Movie"
);

const handleSave = () => {
  const toast = useToast();
  const movieName = formData.value.nameEn || "Movie";

  toast.success({
    message: isEditing.value
      ? `${movieName} updated successfully!`
      : `${movieName} created successfully!`,
    position: "topCenter",
  });

  emit("close");
};

const handleClose = () => {
  emit("close");
};

watch(directorsText, (newValue) => {
  formData.value.directors = newValue
    .split(",")
    .map((d) => d.trim())
    .filter((d) => d);
});

watch(castsText, (newValue) => {
  formData.value.casts = newValue
    .split(",")
    .map((c) => c.trim())
    .filter((c) => c);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    @click="handleClose"
  >
    <!-- Modal panel -->
    <div
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full md:w-[900px] max-h-[90vh] overflow-hidden"
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
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 max-h-[70vh] overflow-y-auto">
        <form @submit.prevent="handleSave" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Movie Names -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Movie Name (English) *
              </label>
              <input
                type="text"
                v-model="formData.nameEn"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter English name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Movie Name (Vietnamese) *
              </label>
              <input
                type="text"
                v-model="formData.nameVi"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Vietnamese name"
              />
            </div>

            <!-- Movie Code and Duration -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Movie Code *
              </label>
              <input
                type="text"
                v-model="formData.code"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., MOV001"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Duration (minutes) *
              </label>
              <input
                type="number"
                v-model.number="formData.duration"
                required
                min="1"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 120"
              />
            </div>

            <!-- Release Date and Status -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Release Date *
              </label>
              <input
                type="date"
                v-model="formData.releaseDate"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Status *
              </label>
              <select
                v-model="formData.status"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="coming_soon">Coming Soon</option>
                <option value="now_showing">Now Showing</option>
                <option value="ended">Ended</option>
              </select>
            </div>

            <!-- Poster and Trailer URLs -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Poster Image URL
              </label>
              <input
                type="url"
                v-model="formData.posterImg"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/poster.jpg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Trailer URL
              </label>
              <input
                type="url"
                v-model="formData.trailer"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <!-- Ratings -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Rating (0-10)
              </label>
              <input
                type="number"
                v-model.number="formData.ratings"
                min="0"
                max="10"
                step="0.1"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 8.5"
              />
            </div>
          </div>

          <!-- Genres -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Genres
            </label>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              <label
                v-for="genre in allGenres"
                :key="genre.id"
                class="flex items-center space-x-2 text-sm text-gray-300"
              >
                <input
                  type="checkbox"
                  :value="genre.id"
                  v-model="formData.genres"
                  class="rounded border-gray-600 bg-[#0d1117] text-blue-500 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span>{{ genre.translatedName.en.name }}</span>
              </label>
            </div>
          </div>

          <!-- Brief Descriptions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Brief Description (English)
              </label>
              <textarea
                v-model="formData.briefEn"
                rows="3"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description in English..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Brief Description (Vietnamese)
              </label>
              <textarea
                v-model="formData.briefVi"
                rows="3"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description in Vietnamese..."
              ></textarea>
            </div>
          </div>

          <!-- Full Descriptions -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Full Description (English)
              </label>
              <textarea
                v-model="formData.descriptionEn"
                rows="4"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full description in English..."
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Full Description (Vietnamese)
              </label>
              <textarea
                v-model="formData.descriptionVi"
                rows="4"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full description in Vietnamese..."
              ></textarea>
            </div>
          </div>

          <!-- Directors and Casts -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Directors
              </label>
              <input
                type="text"
                v-model="directorsText"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Director 1, Director 2, ..."
              />
              <p class="text-xs text-gray-500 mt-1">
                Separate multiple directors with commas
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Cast
              </label>
              <input
                type="text"
                v-model="castsText"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Actor 1, Actor 2, ..."
              />
              <p class="text-xs text-gray-500 mt-1">
                Separate multiple cast members with commas
              </p>
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
          {{ isEditing ? "Update Movie" : "Create Movie" }}
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
