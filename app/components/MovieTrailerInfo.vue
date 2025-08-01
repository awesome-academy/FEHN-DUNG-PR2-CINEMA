<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import {
  X,
  Play,
  Calendar,
  Clock,
  Star,
  Users,
  Film,
  Archive,
  Ticket,
} from "lucide-vue-next";
import { useI18n } from "vue-i18n";

interface Props {
  isOpen: boolean;
  movie: any;
}

interface Emits {
  (e: "close"): void;
  (e: "buyTickets", movieId: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const localePath = useLocalePath();

const { t, locale } = useI18n();
const videoRef = ref<HTMLVideoElement>();
const isPlaying = ref(false);

const formatDuration = (minutes: number) => {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const formatReleaseDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(locale.value, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const closeModal = () => {
  if (videoRef.value) {
    videoRef.value.pause();
    isPlaying.value = false;
  }
  emit("close");
};

const handleBuyTickets = () => {
  if (props.movie?.id) {
    emit("buyTickets", props.movie.id);
  }
};

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    closeModal();
  }
};

function getYouTubeId(url: string) {
  const regExp =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : "";
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
      if (videoRef.value) {
        videoRef.value.pause();
        isPlaying.value = false;
      }
    }
  }
);

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = "auto";
});
</script>

<template>
  <div
    v-if="isOpen && movie"
    class="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-0 bg-black/80 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div
      class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-lg shadow-2xl"
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
      >
        <X class="w-6 h-6 text-white" />
      </button>
      <!-- Trailer Video -->
      <div class="relative aspect-video bg-black">
        <div v-if="movie.trailer && movie.trailer.includes('youtube.com')">
          <iframe
            :src="`https://www.youtube.com/embed/${getYouTubeId(
              movie.trailer
            )}`"
            class="absolute top-0 left-0 w-full h-full"
            style="border: 0"
            allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div v-else class="relative w-full h-full">
          <img
            :src="movie.posterImg"
            :alt="movie.name"
            class="w-full h-full object-cover"
          />
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <div class="text-center text-white">
              <Film class="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p class="text-lg">Trailer not available</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Movie Info Section -->
      <div class="p-6 text-white">
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1">
            <h1 class="text-3xl font-bold mb-4">{{ movie.name }}</h1>

            <div class="flex flex-wrap items-center gap-4 mb-4 text-sm">
              <div class="flex items-center gap-1">
                <Star class="w-4 h-4 text-yellow-400" />
                <span>{{ movie.ratings }}/5</span>
              </div>
              <div class="flex items-center gap-1">
                <Calendar class="w-4 h-4 text-gray-400" />
                <span>{{ new Date(movie.releaseDate).getFullYear() }}</span>
              </div>
              <div class="flex items-center gap-1">
                <Clock class="w-4 h-4 text-gray-400" />
                <span>{{ formatDuration(movie.duration) }}</span>
              </div>
              <span
                class="px-2 py-1 rounded text-xs border"
                :class="{
                  'border-green-400 text-green-400':
                    movie.status === 'now_showing',
                  'border-yellow-400 text-yellow-400':
                    movie.status === 'coming_soon',
                  'border-gray-400 text-gray-400': movie.status === 'ended',
                }"
              >
                {{
                  movie.status === "now_showing"
                    ? "Now Showing"
                    : movie.status === "coming_soon"
                    ? "Coming Soon"
                    : "Ended"
                }}
              </span>
            </div>

            <div class="mb-6">
              <h3 class="text-lg font-semibold mb-2">
                {{ t("movieTrailerInfo.brief") }}
              </h3>
              <p class="text-gray-300 leading-relaxed">
                {{
                  movie.description ||
                  movie.brief ||
                  "No description available."
                }}
              </p>
            </div>

            <div class="flex gap-4 mb-6">
              <button
                @click="handleBuyTickets"
                :disabled="movie.status === 'ended'"
                class="flex justify-center items-center gap-2 bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 hover:cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                <Ticket />
                {{
                  movie.status === "ended"
                    ? t("movieTrailerInfo.notAvailable")
                    : t("movieTrailerInfo.buyTickets")
                }}
              </button>
              <NuxtLink
                :to="localePath(`/movieDetail/${movie.id}`)"
                class="flex justify-center items-center gap-2 bg-red-600 text-white px-6 py-3 rounded font-semibold hover:bg-red-700 hover:cursor-pointer disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                {{ t("movieTrailerInfo.viewDetails") }}
              </NuxtLink>
            </div>
          </div>

          <!-- Side Info -->
          <div class="lg:w-80">
            <div class="space-y-4">
              <!-- Cast -->
              <div v-if="movie.casts?.length">
                <h4 class="font-semibold mb-2 flex items-center gap-2">
                  <Users class="w-4 h-4" />
                  {{ t("movieTrailerInfo.cast") }}
                </h4>
                <div class="text-sm text-gray-300 space-y-1">
                  <div v-for="cast in movie.casts.slice(0, 5)" :key="cast">
                    {{ cast }}
                  </div>
                  <div v-if="movie.casts.length > 5" class="text-gray-400">
                    +{{ movie.casts.length - 5 }} more
                  </div>
                </div>
              </div>

              <!-- Directors -->
              <div v-if="movie.directors?.length">
                <h4 class="font-semibold mb-2 flex items-center gap-2">
                  <Film class="w-4 h-4" />
                  {{ t("movieTrailerInfo.directors") }}
                </h4>
                <div class="text-sm text-gray-300">
                  {{ movie.directors.join(", ") }}
                </div>
              </div>

              <!-- Genres -->
              <div v-if="movie.genres?.length">
                <h4 class="font-semibold mb-2 flex items-center gap-2">
                  <Archive class="w-4 h-4" />
                  {{ t("movieTrailerInfo.genres") }}
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="genre in movie.genres"
                    :key="genre"
                    class="px-2 py-1 bg-gray-700 rounded text-xs"
                  >
                    {{ genre }}
                  </span>
                </div>
              </div>

              <!-- Release Date -->
              <div>
                <h4 class="font-semibold mb-2 flex items-center gap-2">
                  <Calendar class="w-4 h-4" />
                  {{ t("movieTrailerInfo.releaseDate") }}
                </h4>
                <div class="text-sm text-gray-300">
                  {{ formatReleaseDate(movie.releaseDate) }}
                </div>
              </div>
            </div>
          </div>
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
