<script setup lang="ts">
import { X, Save } from "lucide-vue-next";
import type { Voucher, VoucherType, MembershipTier } from "~~/types/type";

interface Props {
  isOpen: boolean;
  voucher?: Voucher | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const formData = ref({
  code: "",
  type: "percent" as VoucherType,
  value: 0,
  maxDiscount: 0,
  minOrder: 0,
  validFrom: "",
  validTo: "",
  usageLimit: 0,
  status: "active" as "active" | "inactive" | "expired",
  descriptionEn: "",
  descriptionVi: "",
  applicableTiers: [] as MembershipTier[],
});

const voucherTypes: { value: VoucherType; label: string }[] = [
  { value: "percent", label: "Percentage" },
  { value: "fixed", label: "Fixed Amount" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "expired", label: "Expired" },
];

const membershipTiers: { value: MembershipTier; label: string }[] = [
  { value: "member", label: "Member" },
  { value: "vip", label: "VIP" },
  { value: "vvip", label: "VVIP" },
];

const toDateInput = (s?: string | null) => s?.split("T", 1)[0] ?? "";

watch(
  () => props.voucher,
  (voucher) => {
    if (voucher) {
      const enTranslation = voucher.translations.find((t) => t.locale === "en");
      const viTranslation = voucher.translations.find((t) => t.locale === "vi");

      formData.value = {
        code: voucher.code || "",
        type: voucher.type || "percent",
        value: voucher.value || 0,
        maxDiscount: voucher.maxDiscount || 0,
        minOrder: voucher.minOrder || 0,
        validFrom: toDateInput(voucher.validFrom),
        validTo: toDateInput(voucher.validTo),
        usageLimit: voucher.usageLimit || 0,
        status: voucher.status || "active",
        descriptionEn: enTranslation?.description || "",
        descriptionVi: viTranslation?.description || "",
        applicableTiers: voucher.applicableTiers || [],
      };
    } else {
      formData.value = {
        code: "",
        type: "percent",
        value: 0,
        maxDiscount: 0,
        minOrder: 0,
        validFrom: "",
        validTo: "",
        usageLimit: 0,
        status: "active",
        descriptionEn: "",
        descriptionVi: "",
        applicableTiers: [],
      };
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.voucher);
const modalTitle = computed(() =>
  isEditing.value ? "Edit Voucher" : "Add New Voucher"
);

const toggleTier = (tier: MembershipTier) => {
  const index = formData.value.applicableTiers.indexOf(tier);
  if (index > -1) {
    formData.value.applicableTiers.splice(index, 1);
  } else {
    formData.value.applicableTiers.push(tier);
  }
};

const handleSave = () => {
  const toast = useToast();
  const voucherCode = formData.value.code || "Voucher";

  toast.success({
    message: isEditing.value
      ? `${voucherCode} updated successfully!`
      : `${voucherCode} created successfully!`,
    position: "topCenter",
  });

  emit("close");
};

const handleClose = () => {
  emit("close");
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
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[800px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h3 class="text-lg leading-6 font-medium text-white">
              {{ modalTitle }}
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
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[60vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Row 1: Code and Type -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Voucher Code -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Voucher Code *
              </label>
              <input
                type="text"
                v-model="formData.code"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter voucher code (e.g., SAVE20)"
              />
            </div>

            <!-- Type -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Type *
              </label>
              <select
                v-model="formData.type"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option
                  v-for="type in voucherTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Row 2: Value and Max Discount -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Value -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                {{
                  formData.type === "percent"
                    ? "Discount Percentage *"
                    : "Discount Amount (VND) *"
                }}
              </label>
              <input
                type="number"
                v-model.number="formData.value"
                required
                :min="0"
                :max="formData.type === 'percent' ? 100 : undefined"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :placeholder="
                  formData.type === 'percent'
                    ? 'Enter percentage (0-100)'
                    : 'Enter amount in VND'
                "
              />
            </div>

            <!-- Max Discount (only for percent type) -->
            <div v-if="formData.type === 'percent'">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Max Discount (VND)
              </label>
              <input
                type="number"
                v-model.number="formData.maxDiscount"
                :min="0"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maximum discount amount"
              />
            </div>
          </div>

          <!-- Row 3: Min Order and Usage Limit -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Min Order -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Minimum Order (VND)
              </label>
              <input
                type="number"
                v-model.number="formData.minOrder"
                :min="0"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Minimum order amount"
              />
            </div>

            <!-- Usage Limit -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Usage Limit
              </label>
              <input
                type="number"
                v-model.number="formData.usageLimit"
                :min="0"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Total usage limit (0 = unlimited)"
              />
            </div>
          </div>

          <!-- Row 4: Valid From and Valid To -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Valid From -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Valid From *
              </label>
              <input
                type="date"
                v-model="formData.validFrom"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <!-- Valid To -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Valid To *
              </label>
              <input
                type="date"
                v-model="formData.validTo"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Status *
            </label>
            <select
              v-model="formData.status"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option
                v-for="status in statusOptions"
                :key="status.value"
                :value="status.value"
              >
                {{ status.label }}
              </option>
            </select>
          </div>

          <!-- Description (English) -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Description (English) *
            </label>
            <textarea
              v-model="formData.descriptionEn"
              required
              rows="3"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter English description"
            ></textarea>
          </div>

          <!-- Description (Vietnamese) -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Description (Vietnamese) *
            </label>
            <textarea
              v-model="formData.descriptionVi"
              required
              rows="3"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Enter Vietnamese description"
            ></textarea>
          </div>

          <!-- Applicable Tiers -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Applicable Membership Tiers
            </label>
            <div class="flex flex-wrap gap-3">
              <label
                v-for="tier in membershipTiers"
                :key="tier.value"
                class="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  :checked="formData.applicableTiers.includes(tier.value)"
                  @change="toggleTier(tier.value)"
                  class="w-4 h-4 text-blue-600 bg-[#0d1117] border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span class="text-sm text-gray-300">{{ tier.label }}</span>
              </label>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Leave empty to apply to all membership tiers
            </p>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div
        class="bg-[#161b22] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-700"
      >
        <button
          @click="handleSave"
          class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ isEditing ? "Update Voucher" : "Create Voucher" }}
        </button>
        <button
          @click="handleClose"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#0d1117] text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
