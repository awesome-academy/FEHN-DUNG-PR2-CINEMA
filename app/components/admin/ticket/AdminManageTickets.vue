<script setup lang="ts">
import TicketList from "./TicketList.vue";
import SoldInvoiceList from "./SoldInvoiceList.vue";
import SoldFnBList from "./SoldFnBList.vue";

interface Props {
  activeTab: string;
}

defineProps<Props>();
</script>
<template>
  <div class="p-4 md:p-6">
    <TicketList v-if="activeTab === 'tickets'" />
    <SoldInvoiceList v-if="activeTab === 'sold-invoices'" />
    <SoldFnBList v-if="activeTab === 'sold-fnb'" />
  </div>
</template>

<style scoped></style>
