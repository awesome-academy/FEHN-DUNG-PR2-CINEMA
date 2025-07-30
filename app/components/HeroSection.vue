<script setup lang="ts">
import { Menu, X } from "lucide-vue-next";
const { t, locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const navigationItems = [
  { key: "home", label: "navbar.home", path: "/" },
  { key: "movies", label: "navbar.movies", path: "/movies" },
  { key: "cinemas", label: "navbar.cinemas", path: "/cinemas" },
  { key: "about", label: "navbar.about", path: "/about" },
];

const mobileMenuOpen = ref(false);

watch(
  () => locale.value,
  () => {
    mobileMenuOpen.value = false;
  }
);

const openNavItemsMenu = () => {
  mobileMenuOpen.value = true;
};

const closeMenu = () => {
  mobileMenuOpen.value = false;
};

const handleOverlayClick = () => {
  closeMenu();
};
</script>

<template>
  <div class="relative">
    <NuxtImg
      src="/cinema/cgv.jpg"
      alt="hero image"
      class="w-full md:h-[600px] object-cover"
    />
    <button
      @click="openNavItemsMenu"
      class="absolute block md:hidden top-2 left-2 z-10 bg-black/50 hover:bg-black/70 hover:cursor-pointer text-white p-2 rounded-md transition-all duration-200 backdrop-blur-sm"
      aria-label="Open menu"
    >
      <Menu class="w-6 h-6" />
    </button>

    <div
      v-if="mobileMenuOpen"
      @click="handleOverlayClick"
      class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
    />

    <div
      :class="[
        'fixed top-0 left-0 w-[50%] max-w-[200px] h-full bg-white text-gray-700 p-5 z-50 shadow-lg transition-transform duration-300 ease-in-out',
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
      ]"
    >
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-xl font-bold">Menu</h2>
        <button
          @click="closeMenu"
          class="text-gray-500 hover:text-red-500 transition-colors duration-200"
          aria-label="Close menu"
        >
          <X class="w-6 h-6" />
        </button>
      </div>

      <div class="flex flex-col gap-4">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.key"
          :to="localePath(item.path)"
          class="text-[16px] p-3 rounded hover:bg-gray-100 hover:text-black transition-all duration-200"
          @click="closeMenu"
        >
          {{ t(item.label) }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
