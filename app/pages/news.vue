<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { EventResult } from "~/composables/useEvents";
import { useEvents } from "~/composables/useEvents";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-vue-next";
import ListNews from "../components/ListNews.vue";
import { onClickOutside } from "@vueuse/core";

const { t, locale } = useI18n();
const { events: translatedEvents } = useEvents(locale);

const searchQuery = ref("");
const selectedMonth = ref("");
const selectedYear = ref("");
const currentPage = ref(1);
const itemsPerPage = 4;
const isLoading = ref(false);
const showMonthDropdown = ref(false);
const monthDropdownRef = ref(null);

const months = [
  { value: "01", label: "months.january" },
  { value: "02", label: "months.february" },
  { value: "03", label: "months.march" },
  { value: "04", label: "months.april" },
  { value: "05", label: "months.may" },
  { value: "06", label: "months.june" },
  { value: "07", label: "months.july" },
  { value: "08", label: "months.august" },
  { value: "09", label: "months.september" },
  { value: "10", label: "months.october" },
  { value: "11", label: "months.november" },
  { value: "12", label: "months.december" },
];

const filteredEvents = computed(() => {
  let filtered = translatedEvents.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((event) => {
      return (
        event.name.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.type.toLowerCase().includes(query)
      );
    });
  }

  if (selectedMonth.value || selectedYear.value) {
    filtered = filtered.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);

      let matchesMonth = true;
      let matchesYear = true;

      if (selectedMonth.value) {
        const month = selectedMonth.value.padStart(2, "0");
        matchesMonth =
          startDate.getMonth() + 1 === parseInt(month) ||
          endDate.getMonth() + 1 === parseInt(month) ||
          (startDate.getMonth() + 1 < parseInt(month) &&
            endDate.getMonth() + 1 > parseInt(month));
      }

      if (selectedYear.value) {
        const year = parseInt(selectedYear.value);
        matchesYear =
          startDate.getFullYear() === year ||
          endDate.getFullYear() === year ||
          (startDate.getFullYear() < year && endDate.getFullYear() > year);
      }

      return matchesMonth && matchesYear;
    });
  }

  return filtered;
});

const totalEvents = computed(() => filteredEvents.value.length);
const totalPages = computed(() => Math.ceil(totalEvents.value / itemsPerPage));

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredEvents.value.slice(start, end);
});

const availableYears = computed(() => {
  const years = translatedEvents.value.flatMap((event) => [
    new Date(event.startDate).getFullYear(),
    new Date(event.endDate).getFullYear(),
  ]);
  return [...new Set(years)].sort((a, b) => b - a);
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    selectedMonth.value !== "" ||
    selectedYear.value !== ""
  );
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

const clearFilters = () => {
  searchQuery.value = "";
  selectedMonth.value = "";
  selectedYear.value = "";
  currentPage.value = 1;
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

onClickOutside(monthDropdownRef, () => {
  showMonthDropdown.value = false;
});

watch([searchQuery, selectedMonth, selectedYear], () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="h-screen overflow-y-scroll bg-[#0d1117] text-white">
    <Navbar />
    <div class="container">
      <div class="flex flex-col gap-8 my-8">
        <!-- Search and Filters -->
        <div
          class="flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        >
          <!-- Search Field -->
          <div class="relative w-full md:max-w-md">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t('listEvents.searchPlaceholder')"
              class="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>

          <!-- Filters -->
          <div
            class="flex flex-row gap-4 justify-start md:justify-center items-center"
          >
            <!-- Month Filter -->
            <div class="relative">
              <button
                @click="showMonthDropdown = !showMonthDropdown"
                class="min-w-[140px] flex justify-between items-center gap-2 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div class="flex justify-center items-center gap-2">
                  <Filter class="w-4 h-4" />
                  {{
                    selectedMonth
                      ? t(
                          months.find((m) => m.value === selectedMonth)
                            ?.label || ""
                        )
                      : t("listEvents.filterMonth")
                  }}
                </div>
                <ChevronDown class="w-4 h-4" />
              </button>

              <div
                v-if="showMonthDropdown"
                ref="monthDropdownRef"
                class="absolute top-full left-0 mt-2 min-w-[140px] bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 max-h-60 overflow-y-auto"
              >
                <div class="p-2">
                  <button
                    @click="
                      selectedMonth = '';
                      showMonthDropdown = false;
                    "
                    class="w-full text-left p-2 hover:bg-gray-700 rounded cursor-pointer text-sm"
                    :class="{ 'bg-red-600': selectedMonth === '' }"
                  >
                    {{ t("listEvents.filterMonth") }}
                  </button>
                  <button
                    v-for="month in months"
                    :key="month.value"
                    @click="
                      selectedMonth = month.value;
                      showMonthDropdown = false;
                    "
                    class="w-full text-left p-2 hover:bg-gray-700 rounded cursor-pointer text-sm"
                    :class="{ 'bg-red-600': selectedMonth === month.value }"
                  >
                    {{ t(month.label) }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Year Filter -->
            <select
              v-model="selectedYear"
              class="px-4 py-3 min-w-[60px] bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-600 text-white"
            >
              <option value="">{{ t("listEvents.filterYear") }}</option>
              <option
                v-for="year in availableYears"
                :key="year"
                :value="year.toString()"
              >
                {{ year }}
              </option>
            </select>

            <!-- Clear Filters -->
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2"
            >
              <X class="w-4 h-4" />
              {{ t("listEvents.clearFilters") }}
            </button>
          </div>
        </div>

        <!-- Events Grid -->
        <div class="">
          <div class="flex items-center mb-6">
            <h2 class="text-2xl font-bold">
              {{ t("listEvents.listEventsTitle") }}
              <span class="text-gray-400 text-[20px] ml-2">{{
                totalEvents
              }}</span>
            </h2>
          </div>

          <!-- Loading State -->
          <div v-if="isLoading" class="flex justify-center items-center py-20">
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"
            ></div>
          </div>

          <!-- No Results -->
          <div
            v-else-if="filteredEvents.length === 0"
            class="text-center py-20"
          >
            <div class="text-gray-400 text-lg mb-4">
              {{ t("listEvents.noResults") }}
            </div>
            <button
              @click="clearFilters"
              class="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              {{ t("listEvents.clearFilters") }}
            </button>
          </div>

          <!-- Events Grid -->
          <ListNews v-else :events="paginatedEvents" />
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center gap-2"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="goToPage(page as number)"
              :class="[
                'px-3 py-2 rounded-lg transition-colors',
                currentPage === page
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 hover:bg-gray-700',
              ]"
            >
              {{ page }}
            </button>
            <span v-else class="px-3 py-2 text-gray-500">...</span>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
