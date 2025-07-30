<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale, locales, setLocale } = useI18n();

const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 640;
};

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});

const localeOptions = computed(() =>
  locales.value.map((l) => ({
    label: isMobile.value
      ? l.code === "en"
        ? "🇺🇸"
        : "🇻🇳"
      : l.code === "en"
      ? "🇺🇸 English"
      : "🇻🇳 Tiếng Việt",
    value: l.code,
  }))
);

const selectedLocale = computed({
  get: () => locale.value,
  set: (value: string) => setLocale(value as "en" | "vi"),
});
</script>

<template>
  <div class="flex gap-2">
    <USelect
      v-model="selectedLocale"
      :items="localeOptions"
      class="md:w-36"
      size="md"
    />
  </div>
</template>
