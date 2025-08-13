<script setup lang="ts">
import { X, Coffee, Package, Receipt, ShoppingCart } from "lucide-vue-next";

interface Props {
  isOpen: boolean;
  soldFnb?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    @click="handleClose"
  >
    <!-- Modal panel -->
    <div
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[600px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <ShoppingCart class="w-6 h-6 text-blue-400 mr-3" />
            <h3 class="text-lg leading-6 font-medium text-white">
              Sold F&B Details #{{ soldFnb?.id }}
            </h3>
          </div>
          <button
            @click="handleClose"
            class="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div
        class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[70vh]"
        v-if="soldFnb"
      >
        <div class="space-y-6">
          <!-- Item Information with Image -->
          <div class="flex flex-col md:flex-row gap-6">
            <!-- Image -->
            <div class="flex-shrink-0">
              <div class="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
                <img
                  v-if="soldFnb.itemImage"
                  :src="soldFnb.itemImage"
                  :alt="soldFnb.itemName.en"
                  class="w-full h-full object-cover rounded-lg border border-gray-600"
                />
                <div
                  v-else
                  class="w-full h-full bg-gray-700 rounded-lg border border-gray-600 flex items-center justify-center"
                >
                  <Coffee class="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>

            <!-- Item Details -->
            <div class="flex-1 space-y-4">
              <div>
                <h4 class="text-xl font-bold text-white mb-2">
                  {{ soldFnb.itemName.en }}
                </h4>
                <p class="text-lg text-gray-300">
                  {{ soldFnb.itemName.vi }}
                </p>
              </div>

              <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs text-gray-400 mb-1"
                      >Unit Price</label
                    >
                    <p class="text-lg font-semibold text-white">
                      {{ formatCurrency(soldFnb.pricePerItem) }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-400 mb-1"
                      >Quantity</label
                    >
                    <p class="text-lg font-semibold text-white">
                      {{ soldFnb.quantity }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Transaction Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Sale Information -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <Package class="w-4 h-4 mr-2" />
                Sale Information
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Sale ID</label
                  >
                  <p class="text-white font-medium">#{{ soldFnb.id }}</p>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >F&B Item ID</label
                  >
                  <p class="text-gray-300 font-mono">
                    #{{ soldFnb.fnbItemId }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Invoice Information -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <Receipt class="w-4 h-4 mr-2" />
                Invoice Information
              </h4>
              <div class="space-y-3">
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Invoice Code</label
                  >
                  <p class="text-blue-400 font-mono font-medium">
                    {{ soldFnb.invoiceCode }}
                  </p>
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1"
                    >Invoice ID</label
                  >
                  <p class="text-gray-300 font-mono">
                    #{{ soldFnb.soldInvoiceId }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pricing Breakdown -->
          <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
            <h4
              class="text-sm font-medium text-gray-300 mb-3 flex items-center"
            >
              <Coffee class="w-4 h-4 mr-2" />
              Pricing Breakdown
            </h4>
            <div class="space-y-3">
              <div
                class="flex justify-between items-center py-2 border-b border-gray-600"
              >
                <span class="text-gray-300">Unit Price:</span>
                <span class="text-white font-medium">
                  {{ formatCurrency(soldFnb.pricePerItem) }}
                </span>
              </div>
              <div
                class="flex justify-between items-center py-2 border-b border-gray-600"
              >
                <span class="text-gray-300">Quantity:</span>
                <span class="text-white font-medium">{{
                  soldFnb.quantity
                }}</span>
              </div>
              <div class="flex justify-between items-center py-2 pt-3">
                <span class="text-lg font-semibold text-gray-300"
                  >Total Amount:</span
                >
                <span class="text-xl font-bold text-green-400">
                  {{ formatCurrency(soldFnb.totalPrice) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="bg-[#161b22] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-700"
      >
        <button
          @click="handleClose"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#0d1117] text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
