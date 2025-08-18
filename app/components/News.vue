<script setup lang="ts">
import { useEvents } from "~/composables/useEvents";
import { computed } from "vue";
import { Calendar } from "lucide-vue-next";

const { t, locale } = useI18n();
const { events: allEvents } = useEvents(locale);
const localePath = useLocalePath();
const router = useRouter();

// Filter active events for display
const activeEvents = computed(() => {
  return allEvents.value
    .filter((event) => event.status === "active")
    .slice(0, 6);
});

// Get event type styling
const getEventTypeStyle = (type: string) => {
  const styles: Record<string, string> = {
    discount: "bg-gradient-to-r from-red-500 to-pink-500",
    special_screening: "bg-gradient-to-r from-purple-500 to-indigo-500",
    combo: "bg-gradient-to-r from-green-500 to-teal-500",
    giveaway: "bg-gradient-to-r from-yellow-500 to-orange-500",
  };
  return styles[type] || "bg-gradient-to-r from-gray-500 to-gray-600";
};

// Get event type label
const getEventTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    discount: locale.value === "vi" ? "Khuyến Mãi" : "Discount",
    special_screening:
      locale.value === "vi" ? "Suất Chiếu Đặc Biệt" : "Special Screening",
    combo: locale.value === "vi" ? "Combo Ưu Đãi" : "Combo Deal",
    giveaway: locale.value === "vi" ? "Quà Tặng" : "Giveaway",
  };
  return labels[type] || type;
};

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale.value === "vi" ? "vi-VN" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const navigateToEvent = (eventId: number) => {
  router.push(localePath(`/newsDetail/${eventId}`));
};
</script>

<template>
  <div class="bg-[#0d1117] text-white py-16">
    <div class="container mx-auto px-4 overflow-hidden">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-2xl font-bold text-white mb-4">
          {{ t("news.title") }}
        </h2>
      </div>

      <!-- Events Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="event in activeEvents"
          :key="event.id"
          @click="navigateToEvent(event.id)"
          class="group relative bg-[#161b22] rounded-2xl overflow-hidden transition-all duration-300 hover:cursor-pointer hover:shadow-2xl hover:shadow-gray-500/20"
        >
          <!-- Event Image -->
          <div class="relative h-48 overflow-hidden">
            <img
              :src="event.image"
              :alt="event.name"
              class="w-full h-full object-cover transition-transform duration-500"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
            ></div>

            <!-- Event Type Badge -->
            <div class="absolute top-4 left-4">
              <span
                :class="`px-3 py-1 rounded-full text-white text-sm font-semibold ${getEventTypeStyle(
                  event.type
                )}`"
              >
                {{ getEventTypeLabel(event.type) }}
              </span>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <span
                class="px-3 py-1 rounded-full bg-green-500 text-white text-sm font-semibold"
              >
                {{ locale === "vi" ? "Đang Diễn Ra" : "Active" }}
              </span>
            </div>
          </div>

          <!-- Event Content -->
          <div class="p-6">
            <h3
              class="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors"
            >
              {{ event.name }}
            </h3>

            <p class="text-gray-400 text-sm mb-4 line-clamp-3">
              {{ event.description }}
            </p>

            <div
              class="flex items-center justify-between text-sm text-gray-500 mb-4"
            >
              <div class="flex items-center space-x-2">
                <Calendar class="w-[14px] h-[14px]" />
                <span
                  >{{ formatDate(event.startDate) }} -
                  {{ formatDate(event.endDate) }}</span
                >
              </div>
            </div>

            <div class="bg-gray-800 rounded-lg p-3 mb-4">
              <p class="text-xs text-gray-400 line-clamp-2">
                <span class="font-semibold text-gray-300">{{
                  locale === "vi" ? "Điều kiện:" : "Terms:"
                }}</span>
                {{ event.terms }}
              </p>
            </div>

            <button
              @click="navigateToEvent(event.id)"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {{ locale === "vi" ? "Xem Chi Tiết" : "View Details" }}
            </button>
          </div>
        </div>
      </div>

      <div class="text-center my-12">
        <NuxtLink
          :to="localePath('/news')"
          class="bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          {{ locale === "vi" ? "Xem Tất Cả Tin Tức" : "View All News" }}
        </NuxtLink>
      </div>

      <div
        class="absolute top-0 left-0 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"
      ></div>
      <div
        class="absolute bottom-0 right-0 w-32 h-32 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
