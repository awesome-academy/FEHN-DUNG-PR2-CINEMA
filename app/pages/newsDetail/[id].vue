<script setup lang="ts">
import { computed, ref } from "vue";
import { useEvents } from "~/composables/useEvents";
import type { EventResult } from "~/composables/useEvents";
import {
  Calendar,
  MapPin,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Heart,
  Film,
  Users,
} from "lucide-vue-next";

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { events: translatedEvents } = useEvents(locale);

const eventId = computed(() => parseInt(route.params.id as string));
const isLiked = ref(false);

const event = computed<EventResult | null>(() => {
  return translatedEvents.value.find((e) => e.id === eventId.value) || null;
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const isEventActive = computed(() => {
  if (!event.value) return false;
  const now = new Date();
  const startDate = new Date(event.value.startDate);
  const endDate = new Date(event.value.endDate);
  return now >= startDate && now <= endDate;
});

const goBack = () => {
  router.push(localePath("/news"));
};

const shareEvent = () => {
  if (navigator.share) {
    navigator.share({
      title: event.value?.name,
      text: event.value?.description,
      url: window.location.href,
    });
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(window.location.href);
    // You might want to show a toast notification here
  }
};

const toggleLike = () => {
  isLiked.value = !isLiked.value;
};

if (!event.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Event not found",
  });
}
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] text-white pb-8">
    <Navbar />

    <div v-if="event" class="container">
      <button
        @click="goBack"
        class="flex items-center pt-8 md:mt-8 gap-2 text-gray-400 hover:text-white hover:cursor-pointer mb-6 transition-colors"
      >
        <ArrowLeft class="w-5 h-5" />
        {{ t("eventDetail.backBtn") }}
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Event Image -->
        <div class="relative">
          <img
            :src="event.image"
            :alt="event.name"
            class="w-full h-[400px] lg:h-[500px] object-cover rounded-lg shadow-xl"
          />
          <div class="absolute inset-0 rounded-lg" />

          <!-- Status Badge -->
          <div class="absolute top-4 left-4">
            <span
              :class="[
                'px-4 py-2 text-sm font-semibold rounded-full uppercase',
                isEventActive
                  ? 'bg-green-600 text-white'
                  : event.status === 'active'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-600 text-white',
              ]"
            >
              {{ event.status }}
            </span>
          </div>

          <!-- Actions -->
          <div class="absolute top-4 right-4 flex gap-2">
            <button
              @click="toggleLike"
              class="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Heart
                :class="[
                  'w-5 h-5',
                  isLiked ? 'text-red-500 fill-current' : 'text-white',
                ]"
              />
            </button>
            <button
              @click="shareEvent"
              class="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
            >
              <Share2 class="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <!-- Event Info -->
        <div class="space-y-6">
          <!-- Type & Title -->
          <div>
            <div class="flex items-center gap-2 mb-2">
              <Tag class="w-5 h-5 text-red-500" />
              <span class="text-red-500 font-semibold uppercase text-sm">{{
                event.type
              }}</span>
            </div>
            <h1 class="text-4xl font-bold mb-4">{{ event.name }}</h1>
            <p class="text-gray-300 text-lg leading-relaxed">
              {{ event.description }}
            </p>
          </div>

          <!-- Date Information -->
          <div class="bg-[#161b22] rounded-lg p-6 space-y-4">
            <h3 class="text-xl font-semibold flex items-center gap-2">
              <Calendar class="w-5 h-5 text-red-500" />
              {{ t("eventDetail.date") }}
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                <div class="text-gray-400 text-sm">
                  {{ t("eventDetail.startDate") }}
                </div>
                <div class="text-white font-medium">
                  {{ formatDate(event.startDate) }}
                </div>
              </div>

              <div class="space-y-2">
                <div class="text-gray-400 text-sm">
                  {{ t("eventDetail.endDate") }}
                </div>
                <div class="text-white font-medium">
                  {{ formatDate(event.endDate) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Required Tier -->
          <div
            v-if="event.requiredTier"
            class="bg-yellow-900/30 border border-yellow-600 rounded-lg p-4"
          >
            <h4 class="text-yellow-400 font-semibold mb-2">
              {{ t("eventDetail.membershipRequired") }}
            </h4>
            <span
              class="inline-block px-3 py-1 bg-yellow-600 text-white text-sm rounded-full font-medium"
            >
              {{ event.requiredTier }}
            </span>
          </div>

          <!-- Applicable Locations -->
          <div
            v-if="event.applicableCinemas && event.applicableCinemas.length > 0"
            class="bg-[#161b22] rounded-lg p-6"
          >
            <h3 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <MapPin class="w-5 h-5 text-red-500" />
              {{ t("eventDetail.applicableLocations") }}
            </h3>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">
                {{ t("eventDetail.availableAt") }}
                <span class="font-semibold text-white">
                  {{ event.applicableCinemas?.join(", ") }}
                </span>
              </span>
            </div>
          </div>

          <!-- Applicable Movies -->
          <div
            v-if="event.applicableMovies && event.applicableMovies.length > 0"
            class="bg-[#161b22] rounded-lg p-6"
          >
            <h3 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Film class="w-5 h-5 text-red-500" />
              {{ t("eventDetail.applicableMovies") }}
            </h3>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">
                {{ t("eventDetail.validFor") }}
                <span class="font-semibold text-white">
                  {{ event.applicableMovies?.join(", ") }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Terms and Conditions -->
      <div v-if="event.terms" class="bg-[#161b22] rounded-lg p-6">
        <h3 class="text-2xl font-semibold mb-4">
          {{ t("eventDetail.terms") }}
        </h3>
        <div class="max-w-none">
          <p class="text-gray-300 leading-relaxed whitespace-pre-line">
            {{ event.terms }}
          </p>
        </div>
      </div>

      <!-- Event Code -->
      <div
        v-if="event.code"
        class="bg-red-900/30 border border-red-600 rounded-lg p-6 text-center mt-8"
      >
        <h4 class="text-red-400 font-semibold mb-2">
          {{ t("eventDetail.eventCode") }}
        </h4>
        <div
          class="text-2xl font-mono font-bold text-white bg-black/50 inline-block px-4 py-2 rounded"
        >
          {{ event.code }}
        </div>
      </div>
    </div>

    <!-- 404 State -->
    <div v-else class="container mx-auto px-4 py-20 text-center">
      <h1 class="text-4xl font-bold mb-4">{{ t("news.notFound") }}</h1>
      <button
        @click="goBack"
        class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
      >
        {{ t("eventDetail.backBtn") }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
