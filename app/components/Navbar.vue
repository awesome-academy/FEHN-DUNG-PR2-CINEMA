<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();
const localePath = useLocalePath();

const mobileMenuOpen = ref(false);

// Navigation items
const navigationItems = [
  { key: "home", label: "navbar.home", path: "/" },
  { key: "movies", label: "navbar.movies", path: "/movies" },
  { key: "cinemas", label: "navbar.cinemas", path: "/cinemas" },
  { key: "about", label: "navbar.about", path: "/about" },
];

// Close mobile menu when route changes
watch(
  () => locale.value,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>

<template>
  <nav class="hidden md:block bg-[#121212] shadow-lg">
    <div class="container">
      <div class="flex justify-start md:justify-center items-center h-20">
        <div class="flex items-center gap-20">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.key"
            :to="localePath(item.path)"
            class="text-gray-600 hover:text-yellow-600 text-[20px] uppercase font-semibold transition-colors duration-200 relative group"
            active-class="text-yellow-600"
          >
            {{ $t(item.label) }}
            <span
              class="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 transition-all duration-200 group-hover:w-full"
            ></span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
