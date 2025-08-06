<script setup lang="ts">
import { computed } from "vue";
// import { useSoldInvoiceDetails } from "~/composables/useSoldInvoiceDetail";
import HistorySoldInvoices from "./HistorySoldInvoices.vue";
import { useOrderStore } from "~/stores/order";

interface Props {
  user: any;
}

const props = defineProps<Props>();
const { locale } = useI18n();
const orderStore = useOrderStore();

const userId = computed(() => props.user?.id);

const userInvoices = computed(() => {
  if (userId.value) {
    return orderStore
      .getOrdersByUserId(userId.value)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
  return [];
});
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <h2 class="text-2xl font-bold text-white mb-6">
      {{ $t("account.history.title") }}
    </h2>

    <HistorySoldInvoices :invoices="userInvoices" />
  </div>
</template>

<style scoped></style>
