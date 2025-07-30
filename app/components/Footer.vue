<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <div
    class="bg-[#121212] text-white flex justify-center items-center h-[50px] py-2 border-t border-slate-800 shadow-md"
  >
    {{ t("footer.title") }}
  </div>
</template>

<style scoped></style>
