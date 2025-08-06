<script setup lang="ts">
import type { FnbItem } from "~~/types/type";
import {
  ArrowLeft,
  Package,
  Popcorn,
  CupSoda,
  Donut,
  ShoppingBag,
} from "lucide-vue-next";

interface SelectedFnbItem {
  fnbItem: FnbItem;
  quantity: number;
}

interface Props {
  fnbItems: FnbItem[];
  selectedItems: SelectedFnbItem[];
}

interface Emits {
  (e: "select", fnbItem: FnbItem, quantity: number): void;
  (e: "finish"): void;
  (e: "back"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t, locale } = useI18n();

const getFnbName = (fnbItem: FnbItem) => {
  const translation = fnbItem.translations.find(
    (t) => t.locale === locale.value
  );
  return translation?.name || fnbItem.translations[0]?.name || "Unknown Item";
};

const getSelectedQuantity = (fnbItemId: number) => {
  const selectedItem = props.selectedItems.find(
    (item) => item.fnbItem.id === fnbItemId
  );
  return selectedItem?.quantity || 0;
};

const getFnbTypeLabel = (type: FnbItem["type"]) => {
  const labels = {
    popcorn: t("buyTickets.fnbTypes.popcorn"),
    drink: t("buyTickets.fnbTypes.drink"),
    combo: t("buyTickets.fnbTypes.combo"),
    snack: t("buyTickets.fnbTypes.snack"),
  };
  return labels[type];
};

const getFnbTypeIcon = (type: FnbItem["type"]) => {
  const icons = {
    popcorn: Popcorn,
    drink: CupSoda,
    combo: Package,
    snack: Donut,
  };
  return icons[type] || ShoppingBag;
};

const getSizeLabel = (size: FnbItem["size"]) => {
  const labels = {
    S: t("buyTickets.sizes.small"),
    M: t("buyTickets.sizes.medium"),
    L: t("buyTickets.sizes.large"),
  };
  return labels[size];
};

const fnbByType = computed(() => {
  const groups: Record<FnbItem["type"], FnbItem[]> = {
    combo: [],
    popcorn: [],
    drink: [],
    snack: [],
  };

  props.fnbItems.forEach((item) => {
    groups[item.type].push(item);
  });

  return groups;
});

const totalSelectedPrice = computed(() => {
  return props.selectedItems.reduce((total, item) => {
    return total + item.fnbItem.price * item.quantity;
  }, 0);
});

const totalSelectedItems = computed(() => {
  return props.selectedItems.reduce((total, item) => total + item.quantity, 0);
});

const handleQuantityChange = (fnbItem: FnbItem, newQuantity: number) => {
  emit("select", fnbItem, Math.max(0, newQuantity));
};

const handleFinish = () => {
  emit("finish");
};

const handleBack = () => {
  emit("back");
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">{{ t("buyTickets.selectFnb.title") }}</h2>
      <button
        @click="handleBack"
        class="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        {{ t("buyTickets.common.back") }}
      </button>
    </div>

    <div class="space-y-8">
      <!-- Combo Items -->
      <div v-if="fnbByType.combo.length > 0">
        <h3 class="text-lg font-semibold mb-4 flex items-center">
          <Package class="w-5 h-5 mr-2 text-orange-400" />
          {{ getFnbTypeLabel("combo") }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="item in fnbByType.combo"
            :key="item.id"
            class="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
          >
            <div class="flex items-start space-x-4">
              <img
                :src="item.image"
                :alt="getFnbName(item)"
                class="w-16 h-16 object-cover rounded-lg"
              />
              <div class="flex-1">
                <h4 class="font-medium text-white mb-1">
                  {{ getFnbName(item) }}
                </h4>
                <p class="text-sm text-gray-400 mb-2">
                  {{ getSizeLabel(item.size) }}
                </p>
                <p class="text-lg font-bold text-green-400">
                  {{ formatPrice(item.price) }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="
                    handleQuantityChange(item, getSelectedQuantity(item.id) - 1)
                  "
                  class="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded text-white flex items-center justify-center"
                  :disabled="getSelectedQuantity(item.id) === 0"
                >
                  <Icon name="lucide:minus" class="w-4 h-4" />
                </button>
                <span class="w-8 text-center font-medium">{{
                  getSelectedQuantity(item.id)
                }}</span>
                <button
                  @click="
                    handleQuantityChange(item, getSelectedQuantity(item.id) + 1)
                  "
                  class="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center justify-center"
                >
                  <Icon name="lucide:plus" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Individual Items -->
      <div
        v-for="type in ['popcorn', 'drink', 'snack'] as FnbItem['type'][]"
        :key="type"
      >
        <div v-if="fnbByType[type].length > 0">
          <h3 class="text-lg font-semibold mb-4 flex items-center">
            <component
              :is="getFnbTypeIcon(type)"
              class="w-5 h-5 mr-2 text-blue-400"
            />

            {{ getFnbTypeLabel(type) }}
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="item in fnbByType[type]"
              :key="item.id"
              class="bg-gray-700/50 rounded-lg p-4 border border-gray-600"
            >
              <div class="text-center">
                <img
                  :src="item.image"
                  :alt="getFnbName(item)"
                  class="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                />
                <h4 class="font-medium text-white mb-1">
                  {{ getFnbName(item) }}
                </h4>
                <p class="text-sm text-gray-400 mb-2">
                  {{ getSizeLabel(item.size) }}
                </p>
                <p class="text-lg font-bold text-green-400 mb-3">
                  {{ formatPrice(item.price) }}
                </p>

                <div class="flex items-center justify-center space-x-2">
                  <button
                    @click="
                      handleQuantityChange(
                        item,
                        getSelectedQuantity(item.id) - 1
                      )
                    "
                    class="w-8 h-8 bg-gray-600 hover:bg-gray-500 rounded text-white flex items-center justify-center"
                    :disabled="getSelectedQuantity(item.id) === 0"
                  >
                    <Icon name="lucide:minus" class="w-4 h-4" />
                  </button>
                  <span class="w-8 text-center font-medium">{{
                    getSelectedQuantity(item.id)
                  }}</span>
                  <button
                    @click="
                      handleQuantityChange(
                        item,
                        getSelectedQuantity(item.id) + 1
                      )
                    "
                    class="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded text-white flex items-center justify-center"
                  >
                    <Icon name="lucide:plus" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cart Summary -->
    <div
      v-if="totalSelectedItems > 0"
      class="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-medium text-blue-400 mb-2">
            {{ t("buyTickets.selectFnb.cart") }} ({{ totalSelectedItems }}
            {{ t("buyTickets.selectFnb.items") }})
          </h3>
          <div class="space-y-1">
            <div
              v-for="selectedItem in selectedItems"
              :key="selectedItem.fnbItem.id"
              class="text-sm text-gray-300"
            >
              {{ selectedItem.quantity }}x
              {{ getFnbName(selectedItem.fnbItem) }} -
              {{
                formatPrice(selectedItem.fnbItem.price * selectedItem.quantity)
              }}
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="text-sm text-gray-400">
            {{ t("buyTickets.selectFnb.totalPrice") }}
          </p>
          <p class="text-xl font-bold text-blue-400">
            {{ formatPrice(totalSelectedPrice) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Continue Button -->
    <div class="flex justify-end mt-6">
      <button
        @click="handleFinish"
        class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        {{
          totalSelectedItems > 0
            ? t("buyTickets.selectFnb.continue")
            : t("buyTickets.selectFnb.skip")
        }}
        <Icon name="lucide:arrow-right" class="w-4 h-4 ml-2 inline" />
      </button>
    </div>
  </div>
</template>
