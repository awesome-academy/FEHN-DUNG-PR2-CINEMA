<script setup lang="ts">
import { computed } from "vue";
import { useSoldInvoiceDetails } from "~/composables/useSoldInvoiceDetail";
import HistorySoldInvoices from "./HistorySoldInvoices.vue";

interface Props {
  user: any;
}

const props = defineProps<Props>();
const { locale } = useI18n();

const userId = computed(() => props.user?.id);
const { soldInvoiceDetails } = useSoldInvoiceDetails(userId, locale);
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <h2 class="text-2xl font-bold text-white mb-6">
      {{ $t("account.history.title") }}
    </h2>

    <HistorySoldInvoices :invoices="soldInvoiceDetails" />
  </div>
</template>

<style scoped></style>
