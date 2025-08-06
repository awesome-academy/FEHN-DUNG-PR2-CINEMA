<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "~/stores/user";
import { useOrderStore } from "~/stores/order";

interface Props {
  totalPrice: number;
  bookingFlow: any;
}

const props = defineProps<Props>();

const orderStore = useOrderStore();
const userStore = useUserStore();

defineEmits<{
  back: [];
}>();

const router = useRouter();
const toast = useToast();
const localePath = useLocalePath();
const { locale } = useI18n();

const qrCanvas = ref<HTMLCanvasElement>();
const paymentStatus = ref<"waiting" | "processing" | "success">("waiting");
const PAYMENT_DELAY = 2000;

// Generate QR Code
const generateQR = async () => {
  await nextTick();
  if (!qrCanvas.value) return;

  const canvas = qrCanvas.value;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Clear canvas
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, 192, 192);

  // Create a simple pattern for demo QR code
  const cellSize = 8;
  const cells = 24;

  // Generate random pattern for demo
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (Math.random() > 0.5) {
        ctx.fillStyle = "#000000";
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
    }
  }

  // Add corner patterns (typical QR code markers)
  const drawCorner = (x: number, y: number) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = "#000000";
    ctx.fillRect(
      x + 2 * cellSize,
      y + 2 * cellSize,
      3 * cellSize,
      3 * cellSize
    );
  };

  drawCorner(0, 0); // Top-left
  drawCorner(17 * cellSize, 0); // Top-right
  drawCorner(0, 17 * cellSize); // Bottom-left
};

// Simulate payment process
const simulatePayment = async () => {
  paymentStatus.value = "processing";

  const {
    selectedMovieId,
    selectedCinemaId,
    selectedScheduleId,
    selectedSeatIds,
    selectedFnbItems,
    totalPrice,
  } = props.bookingFlow;

  if (
    !userStore.currentUser ||
    !selectedMovieId.value ||
    !selectedCinemaId.value ||
    !selectedScheduleId.value
  ) {
    toast.error({ message: "Thông tin đặt vé bị thiếu, vui lòng thử lại!" });
    paymentStatus.value = "waiting";
    return;
  }

  // Simulate payment processing delay
  setTimeout(() => {
    orderStore.createOrder(
      {
        currentUser: userStore.currentUser,
        selectedMovieId: selectedMovieId.value,
        selectedCinemaId: selectedCinemaId.value,
        selectedScheduleId: selectedScheduleId.value,
        selectedSeatIds: selectedSeatIds.value,
        selectedFnbItems: selectedFnbItems.value,
        totalPrice: totalPrice.value,
        paymentMethod: "online",
      },
      locale.value
    );

    paymentStatus.value = "success";
    toast.success({
      message: "Thanh toán thành công!",
      position: "topCenter",
    });
  }, PAYMENT_DELAY);
};

// Navigate to home
const goToHome = () => {
  router.push("/");
};

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

onMounted(() => {
  generateQR();
});
</script>

<template>
  <div class="max-w-2xl mx-auto px-4">
    <h2 class="text-3xl font-bold text-center mb-8">
      {{ $t("buyTickets.payment.title") }}
    </h2>

    <div class="bg-[#161b22] rounded-lg p-6 mb-6">
      <!-- Payment Amount -->
      <div class="text-center mb-6">
        <p class="text-gray-400 mb-2">
          {{ $t("buyTickets.payment.totalAmount") }}
        </p>
        <p class="text-4xl font-bold text-yellow-400">
          {{ formatPrice(totalPrice) }}
        </p>
      </div>

      <!-- QR Code Section -->
      <div class="text-center mb-6">
        <p class="text-gray-400 mb-4">{{ $t("buyTickets.payment.scanQr") }}</p>

        <div class="bg-white rounded-lg p-4 inline-block mb-4">
          <div class="w-48 h-48 mx-auto flex items-center justify-center">
            <canvas
              ref="qrCanvas"
              width="192"
              height="192"
              class="max-w-full max-h-full"
            ></canvas>
          </div>
        </div>

        <!-- Payment Instructions -->
        <div class="bg-[#0d1117] p-4 rounded-lg mb-4">
          <h4 class="font-semibold text-blue-400 mb-2">
            {{ $t("buyTickets.payment.instructions.title") }}
          </h4>
          <ol class="text-sm text-gray-300 text-left space-y-1">
            <li>1. {{ $t("buyTickets.payment.instructions.step1") }}</li>
            <li>2. {{ $t("buyTickets.payment.instructions.step2") }}</li>
            <li>3. {{ $t("buyTickets.payment.instructions.step3") }}</li>
            <li>4. {{ $t("buyTickets.payment.instructions.step4") }}</li>
          </ol>
        </div>

        <!-- Payment Status -->
        <div
          v-if="paymentStatus === 'waiting'"
          class="flex items-center justify-center gap-2 text-blue-400"
        >
          <svg
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ $t("buyTickets.payment.waiting") }}</span>
        </div>

        <div
          v-if="paymentStatus === 'processing'"
          class="flex items-center justify-center gap-2 text-yellow-400"
        >
          <svg
            class="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{{ $t("buyTickets.payment.processing") }}</span>
        </div>

        <div
          v-if="paymentStatus === 'success'"
          class="text-green-400 font-semibold"
        >
          <svg
            class="inline-block w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {{ $t("buyTickets.payment.success") }}
        </div>
      </div>

      <!-- Alternative Payment Methods -->
      <div class="border-t border-gray-700 pt-4">
        <p class="text-sm text-gray-400 text-center mb-3">
          {{ $t("buyTickets.payment.alternativeMethods") }}
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-4">
          <div
            class="flex items-center gap-2 bg-[#0d1117] px-3 py-2 rounded-lg"
          >
            <div
              class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-xs font-bold"
            >
              MB
            </div>
            <span class="text-sm">MBBank</span>
          </div>
          <div
            class="flex items-center gap-2 bg-[#0d1117] px-3 py-2 rounded-lg"
          >
            <div
              class="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-xs font-bold"
            >
              TCB
            </div>
            <span class="text-sm">Techcombank</span>
          </div>
          <div
            class="flex items-center gap-2 bg-[#0d1117] px-3 py-2 rounded-lg"
          >
            <div
              class="w-8 h-8 bg-pink-600 rounded flex items-center justify-center text-xs font-bold"
            >
              MM
            </div>
            <span class="text-sm">MoMo</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-between gap-4">
      <button
        v-if="paymentStatus !== 'success'"
        @click="$emit('back')"
        :disabled="paymentStatus === 'processing'"
        class="flex-1 bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors"
      >
        {{ $t("buyTickets.common.back") }}
      </button>
      <NuxtLink
        v-if="paymentStatus === 'success'"
        :to="localePath({ path: '/account', query: { tab: 'history' } })"
        class="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors text-center flex items-center justify-center"
      >
        {{ $t("buyTickets.payment.goToMyTickets") }}
      </NuxtLink>
      <button
        v-if="paymentStatus === 'success'"
        @click="goToHome"
        class="flex-1 bg-green-600 hover:bg-green-700 text-white p-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors"
      >
        {{ $t("buyTickets.payment.goToHome") }}
      </button>
      <button
        v-else
        @click="simulatePayment"
        :disabled="paymentStatus === 'processing'"
        class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors"
      >
        {{
          paymentStatus === "processing"
            ? $t("buyTickets.payment.processing")
            : $t("buyTickets.payment.simulatePayment")
        }}
      </button>
    </div>
  </div>
</template>
