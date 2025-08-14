<script setup lang="ts">
import FnbList from "./FnbList.vue";

interface Props {
  activeTab: string;
}

defineProps<Props>();
</script>
<template>
  <div class="min-h-screen">
    <FnbList v-if="activeTab === 'fnb-items'" />
  </div>
</template>

<style scoped></style>
