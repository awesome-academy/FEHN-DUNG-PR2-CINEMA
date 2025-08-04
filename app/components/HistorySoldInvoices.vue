<script setup lang="ts">
import { ref } from "vue";
import type { SoldInvoiceResult } from "~/composables/useSoldInvoiceDetail";
import SoldInvoiceTickets from "./SoldInvoiceTickets.vue";
import SoldInvoiceFnbs from "./SoldInvoiceFnbs.vue";
import { ChevronDown, ChevronUp, Clapperboard, Popcorn } from "lucide-vue-next";

interface Props {
  invoices: SoldInvoiceResult[];
}

const props = defineProps<Props>();
const selectedInvoiceId = ref<number | null>(null);

const toggleInvoiceDetails = (invoiceId: number) => {
  if (selectedInvoiceId.value === invoiceId) {
    selectedInvoiceId.value = null;
  } else {
    selectedInvoiceId.value = invoiceId;
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
</script>

<template>
  <div>
    <!-- Empty state -->
    <div v-if="!invoices || invoices.length === 0" class="text-center py-12">
      <div class="text-gray-400 text-lg mb-2">
        {{ $t("account.history.noInvoices") }}
      </div>
      <p class="text-gray-500 text-sm">
        {{ $t("account.history.noInvoicesDescription") }}
      </p>
    </div>

    <!-- Invoice list -->
    <div v-else class="space-y-4">
      <div
        v-for="invoice in invoices"
        :key="invoice.id"
        class="bg-[#0d1117] rounded-lg border border-gray-800 overflow-hidden"
      >
        <div class="p-4">
          <div
            class="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <div class="text-white font-semibold">
                  {{ $t("account.history.invoiceNumber") }}: #{{ invoice.id }}
                </div>
                <div
                  class="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                >
                  {{ $t("account.history.completed") }}
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                <div class="text-gray-400">
                  {{ $t("account.history.purchaseDate") }}:
                  <span class="text-white ml-1">{{
                    formatDate(invoice.date)
                  }}</span>
                </div>
                <div class="text-gray-400">
                  {{ $t("account.history.itemCount") }}:
                  <span class="text-white ml-1">{{
                    invoice.tickets.length + invoice.soldFnbs.length
                  }}</span>
                </div>
                <div class="text-gray-400">
                  {{ $t("account.history.totalAmount") }}:
                  <span class="text-white ml-1 font-semibold">{{
                    formatCurrency(invoice.totalPrice)
                  }}</span>
                </div>
              </div>
            </div>

            <button
              @click="toggleInvoiceDetails(invoice.id)"
              class="w-[150px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex justify-between items-center"
            >
              {{
                selectedInvoiceId === invoice.id
                  ? $t("account.history.hideDetails")
                  : $t("account.history.viewDetails")
              }}
              <component
                :is="selectedInvoiceId === invoice.id ? ChevronUp : ChevronDown"
                class="w-5 h-5"
              />
            </button>
          </div>

          <div class="mt-4 space-y-2">
            <div v-if="invoice.tickets.length > 0" class="flex flex-wrap gap-2">
              <div
                v-for="(movie, index) in [
                  ...new Set(invoice.tickets.map((t) => t.movieName)),
                ]"
                :key="index"
                class="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full flex items-center gap-2"
              >
                <Clapperboard class="w-4 h-4" />
                {{ movie }}
              </div>
            </div>

            <div
              v-if="invoice.soldFnbs.length > 0"
              class="flex flex-wrap gap-2"
            >
              <div
                v-for="(fnb, index) in invoice.soldFnbs"
                :key="index"
                class="px-3 py-1 bg-orange-800 text-orange-200 text-sm rounded-full flex items-center gap-1"
              >
                <Popcorn class="w-4 h-4" />
                {{ fnb.name }} ({{ fnb.size }}) x{{ fnb.quantity }}
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="selectedInvoiceId === invoice.id"
          class="border-t border-gray-800 bg-[#161b22]"
        >
          <div v-if="invoice.tickets.length > 0">
            <SoldInvoiceTickets :tickets="invoice.tickets" />
          </div>

          <div v-if="invoice.soldFnbs.length > 0">
            <SoldInvoiceFnbs :fnbs="invoice.soldFnbs" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
