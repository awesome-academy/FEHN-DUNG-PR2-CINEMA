<script setup lang="ts">
import EventList from "./EventList.vue";
import VoucherList from "./VoucherList.vue";

defineProps<{
  activeTab: string;
}>();
</script>

<template>
  <div class="min-h-screen">
    <EventList v-if="activeTab === 'events'" />
    <VoucherList v-if="activeTab === 'vouchers'" />
  </div>
</template>

<style scoped></style>
