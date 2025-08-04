<script setup lang="ts">
import type { SoldFnbDetail } from "~/composables/useSoldInvoiceDetail";
import { Torus } from "lucide-vue-next";

interface Props {
  fnbs: SoldFnbDetail[];
}

const props = defineProps<Props>();

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const getSizeLabel = (size: string) => {
  const sizeLabels: Record<string, string> = {
    S: "Small",
    M: "Medium",
    L: "Large",
  };
  return sizeLabels[size] || size;
};

const getSizeBadgeColor = (size: string) => {
  const colors: Record<string, string> = {
    S: "bg-green-600",
    M: "bg-yellow-600",
    L: "bg-red-600",
  };
  return colors[size] || "bg-gray-600";
};
</script>

<template>
  <div class="p-6">
    <h3 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <Torus class="text-orange-500 w-5 h-5" />
      {{ $t("account.history.fnbItems") }}
    </h3>

    <div class="space-y-4">
      <div
        v-for="fnb in fnbs"
        :key="fnb.id"
        class="bg-[#0d1117] rounded-lg p-4 border border-gray-800"
      >
        <div class="flex flex-col sm:flex-row gap-4">
          <!-- F&B details -->
          <div class="flex-1">
            <div
              class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"
            >
              <!-- Left side -->
              <div class="space-y-2">
                <div>
                  <h4 class="text-white font-semibold text-lg">
                    {{ fnb.name }}
                  </h4>
                  <div class="flex items-center gap-2 mt-1">
                    <span
                      class="px-2 py-1 text-white text-xs rounded"
                      :class="getSizeBadgeColor(fnb.size)"
                    >
                      {{ getSizeLabel(fnb.size) }}
                    </span>
                  </div>
                </div>

                <div class="space-y-1">
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.quantity") }}:
                    <span class="text-white font-semibold">{{
                      fnb.quantity
                    }}</span>
                  </div>
                  <div class="text-gray-400 text-sm">
                    {{ $t("account.history.pricePerItem") }}:
                    <span class="text-white">{{
                      formatCurrency(fnb.pricePerItem)
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Right side -->
              <div
                class="md:text-right flex flex-row md:flex-col items-center md:items-end gap-1"
              >
                <div class="text-gray-400 text-sm">
                  {{ $t("account.history.subtotal") }}:
                </div>
                <div class="text-white font-bold text-lg">
                  {{ formatCurrency(fnb.pricePerItem * fnb.quantity) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
