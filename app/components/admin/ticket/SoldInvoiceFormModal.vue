<script setup lang="ts">
import {
  X,
  FileText,
  User,
  CreditCard,
  Banknote,
  Ticket,
  UtensilsCrossed,
  ShoppingCart,
} from "lucide-vue-next";
import {
  tickets,
  soldFnbs,
  fnbItems,
  movieSchedules,
  movies,
  seats,
  screens,
} from "~/data/sampleData";

interface Props {
  isOpen: boolean;
  invoice?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  emit("close");
};

const getPaymentMethodIcon = (method: string) => {
  return method === "cash" ? Banknote : CreditCard;
};

const getPaymentMethodColor = (method: string) => {
  return method === "cash"
    ? "bg-green-500/20 text-green-400 border-green-500/30"
    : "bg-blue-500/20 text-blue-400 border-blue-500/30";
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN");
};

const getTranslations = (
  item: { translations: { locale: string; name: string }[] } | undefined
) => {
  const fallback = { en: "N/A", vi: "N/A" };
  if (!item) return fallback;
  const names = item.translations.reduce((acc, t) => {
    acc[t.locale] = t.name;
    return acc;
  }, {} as Record<string, string>);
  return {
    en: names.en || fallback.en,
    vi: names.vi || fallback.vi,
  };
};

const invoiceTickets = computed(() => {
  if (!props.invoice) return [];

  return tickets
    .filter((ticket) => ticket.soldInvoiceId === props.invoice.id)
    .map((ticket) => {
      const schedule = movieSchedules.find(
        (ms) => ms.id === ticket.movieScheduleId
      );
      const movie = schedule
        ? movies.find((m) => m.id === schedule.movieId)
        : undefined;
      const seat = seats.find((s) => s.id === ticket.seatId);
      const screen = schedule
        ? screens.find((sc) => sc.id === schedule.screenId)
        : undefined;

      return {
        ...ticket,
        movieName: movie ? getTranslations(movie) : { en: "N/A", vi: "N/A" },
        seatInfo: seat ? `${seat.row}${seat.column}` : "N/A",
        screenName: screen?.name ?? "N/A",
      };
    });
});

const invoiceFnbs = computed(() => {
  if (!props.invoice) return [];

  return soldFnbs
    .filter((fnb) => fnb.soldInvoiceId === props.invoice.id)
    .map((soldFnb) => {
      const fnbItem = fnbItems.find((item) => item.id === soldFnb.fnbItemId);

      return {
        ...soldFnb,
        name: fnbItem ? getTranslations(fnbItem) : { en: "N/A", vi: "N/A" },
        type: fnbItem?.type || "N/A",
        size: fnbItem?.size || "N/A",
        totalPrice: soldFnb.pricePerItem * soldFnb.quantity,
      };
    });
});

const ticketsTotal = computed(() => {
  return invoiceTickets.value.reduce((sum, ticket) => sum + ticket.price, 0);
});

const fnbTotal = computed(() => {
  return invoiceFnbs.value.reduce((sum, fnb) => sum + fnb.totalPrice, 0);
});

const grandTotal = computed(() => {
  return ticketsTotal.value + fnbTotal.value;
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    @click="handleClose"
  >
    <!-- Modal panel -->
    <div
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[900px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <FileText class="w-6 h-6 text-blue-400 mr-3" />
            <h3 class="text-lg leading-6 font-medium text-white">
              Invoice Details - {{ invoice?.code }}
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
        class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[75vh]"
        v-if="invoice"
      >
        <div class="space-y-6">
          <!-- Invoice Summary -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Customer Info -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <User class="w-4 h-4 mr-2" />
                Customer Information
              </h4>
              <div class="space-y-2">
                <div>
                  <label class="block text-xs text-gray-400">Customer</label>
                  <p class="text-white font-medium">
                    {{ invoice.customerName }}
                  </p>
                </div>
                <div>
                  <label class="block text-xs text-gray-400">Staff</label>
                  <p class="text-gray-300">{{ invoice.staffName }}</p>
                </div>
              </div>
            </div>

            <!-- Invoice Info -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <FileText class="w-4 h-4 mr-2" />
                Invoice Information
              </h4>
              <div class="space-y-2">
                <div>
                  <label class="block text-xs text-gray-400">Date</label>
                  <p class="text-white font-medium">
                    {{ formatDate(invoice.date) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Payment Info -->
            <div class="bg-[#0d1117] border border-gray-600 rounded-lg p-4">
              <h4
                class="text-sm font-medium text-gray-300 mb-3 flex items-center"
              >
                <component
                  :is="getPaymentMethodIcon(invoice.paymentMethod)"
                  class="w-4 h-4 mr-2"
                />
                Payment Information
              </h4>
              <div class="space-y-2">
                <div>
                  <label class="block text-xs text-gray-400">Method</label>
                  <span
                    :class="[
                      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border',
                      getPaymentMethodColor(invoice.paymentMethod),
                    ]"
                  >
                    <component
                      :is="getPaymentMethodIcon(invoice.paymentMethod)"
                      class="w-3 h-3 mr-1"
                    />
                    {{
                      invoice.paymentMethod.charAt(0).toUpperCase() +
                      invoice.paymentMethod.slice(1)
                    }}
                  </span>
                </div>
                <div>
                  <label class="block text-xs text-gray-400"
                    >Total Amount</label
                  >
                  <p class="text-white font-bold text-lg">
                    {{ formatCurrency(grandTotal) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tickets Section -->
          <div
            v-if="invoiceTickets.length > 0"
            class="bg-[#0d1117] border border-gray-600 rounded-lg p-4"
          >
            <h4
              class="text-sm font-medium text-gray-300 mb-4 flex items-center"
            >
              <Ticket class="w-4 h-4 mr-2" />
              Movie Tickets ({{ invoiceTickets.length }})
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-600">
                    <th class="text-left py-2 text-gray-400">Movie</th>
                    <th class="text-left py-2 text-gray-400">Screen</th>
                    <th class="text-left py-2 text-gray-400">Seat</th>
                    <th class="text-right py-2 text-gray-400">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="ticket in invoiceTickets"
                    :key="ticket.id"
                    class="border-b border-gray-700"
                  >
                    <td class="py-2">
                      <div>
                        <div class="text-white font-medium">
                          {{ ticket.movieName.en }}
                        </div>
                        <div class="text-gray-400 text-xs">
                          {{ ticket.movieName.vi }}
                        </div>
                      </div>
                    </td>
                    <td class="py-2">
                      <span class="text-white font-mono">{{
                        ticket.screenName
                      }}</span>
                    </td>
                    <td class="py-2">
                      <span class="text-white font-mono">{{
                        ticket.seatInfo
                      }}</span>
                    </td>
                    <td class="py-2 text-right">
                      <span class="text-white font-medium">{{
                        formatCurrency(ticket.price)
                      }}</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="border-t-2 border-gray-600">
                    <td colspan="3" class="py-2 text-gray-300 font-medium">
                      Tickets Subtotal:
                    </td>
                    <td class="py-2 text-right text-white font-bold">
                      {{ formatCurrency(ticketsTotal) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- F&B Section -->
          <div
            v-if="invoiceFnbs.length > 0"
            class="bg-[#0d1117] border border-gray-600 rounded-lg p-4"
          >
            <h4
              class="text-sm font-medium text-gray-300 mb-4 flex items-center"
            >
              <UtensilsCrossed class="w-4 h-4 mr-2" />
              Food & Beverage ({{ invoiceFnbs.length }} items)
            </h4>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-600">
                    <th class="text-left py-2 text-gray-400">Item</th>
                    <th class="text-left py-2 text-gray-400">Type/Size</th>
                    <th class="text-center py-2 text-gray-400">Quantity</th>
                    <th class="text-right py-2 text-gray-400">Unit Price</th>
                    <th class="text-right py-2 text-gray-400">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="fnb in invoiceFnbs"
                    :key="fnb.id"
                    class="border-b border-gray-700"
                  >
                    <td class="py-2">
                      <div>
                        <div class="text-white font-medium">
                          {{ fnb.name.en }}
                        </div>
                        <div class="text-gray-400 text-xs">
                          {{ fnb.name.vi }}
                        </div>
                      </div>
                    </td>
                    <td class="py-2">
                      <span class="text-gray-300"
                        >{{ fnb.type }} - {{ fnb.size }}</span
                      >
                    </td>
                    <td class="py-2 text-center">
                      <span class="text-white font-medium">{{
                        fnb.quantity
                      }}</span>
                    </td>
                    <td class="py-2 text-right">
                      <span class="text-gray-300">{{
                        formatCurrency(fnb.pricePerItem)
                      }}</span>
                    </td>
                    <td class="py-2 text-right">
                      <span class="text-white font-medium">{{
                        formatCurrency(fnb.totalPrice)
                      }}</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="border-t-2 border-gray-600">
                    <td colspan="4" class="py-2 text-gray-300 font-medium">
                      F&B Subtotal:
                    </td>
                    <td class="py-2 text-right text-white font-bold">
                      {{ formatCurrency(fnbTotal) }}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <!-- Total Summary -->
          <div class="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <ShoppingCart class="w-5 h-5 text-blue-400 mr-2" />
                <span class="text-lg font-medium text-blue-400"
                  >Grand Total</span
                >
              </div>
              <span class="text-2xl font-bold text-white">{{
                formatCurrency(grandTotal)
              }}</span>
            </div>
            <div class="mt-2 text-sm text-gray-400">
              {{ invoiceTickets.length }} ticket(s) +
              {{ invoiceFnbs.length }} F&B item(s)
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
