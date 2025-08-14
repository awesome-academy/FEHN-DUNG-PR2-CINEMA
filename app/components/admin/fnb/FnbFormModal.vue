<script setup lang="ts">
import { X, Save, UtensilsCrossed } from "lucide-vue-next";
import type { FnbItem } from "~~/types/type";

interface Props {
  isOpen: boolean;
  fnb?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const formData = ref({
  nameEn: "",
  nameVi: "",
  code: "",
  type: "popcorn" as "popcorn" | "drink" | "combo" | "snack",
  size: "M" as "S" | "M" | "L",
  price: 0,
  image: "",
});

const fnbTypes = [
  { value: "popcorn", label: "Popcorn" },
  { value: "drink", label: "Drink" },
  { value: "combo", label: "Combo" },
  { value: "snack", label: "Snack" },
];

const sizes = [
  { value: "S", label: "Small (S)" },
  { value: "M", label: "Medium (M)" },
  { value: "L", label: "Large (L)" },
];

watch(
  () => props.fnb,
  (fnb) => {
    if (fnb) {
      formData.value = {
        nameEn: fnb.translatedName.en || "",
        nameVi: fnb.translatedName.vi || "",
        code: fnb.code || "",
        type: fnb.type || "popcorn",
        size: fnb.size || "M",
        price: fnb.price || 0,
        image: fnb.image || "",
      };
    } else {
      formData.value = {
        nameEn: "",
        nameVi: "",
        code: "",
        type: "popcorn",
        size: "M",
        price: 0,
        image: "",
      };
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.fnb);
const modalTitle = computed(() =>
  isEditing.value ? "Edit F&B Item" : "Add New F&B Item"
);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const handleSave = () => {
  const toast = useToast();
  if (
    !formData.value.nameEn ||
    !formData.value.nameVi ||
    !formData.value.code
  ) {
    toast.error({
      message: "Please fill in all required fields",
      position: "topCenter",
    });
    return;
  }

  const itemName = formData.value.nameEn || "F&B Item";

  toast.success({
    message: isEditing.value
      ? `${itemName} updated successfully!`
      : `${itemName} created successfully!`,
    position: "topCenter",
  });

  emit("close");
};

const handleClose = () => {
  emit("close");
};

const generateCode = () => {
  const name = formData.value.nameEn.replace(/\s+/g, "").toUpperCase();
  const type = formData.value.type.toUpperCase();
  const size = formData.value.size;

  if (name && type) {
    formData.value.code = `${type}-${name.substring(0, 6)}-${size}`;
  }
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
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-hidden"
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
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[70vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Row 1: Names -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- F&B Name (English) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Item Name (English) *
              </label>
              <input
                type="text"
                v-model="formData.nameEn"
                required
                @blur="generateCode"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter English item name"
              />
            </div>

            <!-- F&B Name (Vietnamese) -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Item Name (Vietnamese) *
              </label>
              <input
                type="text"
                v-model="formData.nameVi"
                required
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter Vietnamese item name"
              />
            </div>
          </div>

          <!-- Row 2: Code and Type -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Item Code -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Item Code *
              </label>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="formData.code"
                  required
                  class="flex-1 px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                  placeholder="Enter item code"
                />
                <button
                  type="button"
                  @click="generateCode"
                  class="px-3 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors text-xs"
                  title="Auto-generate code"
                >
                  Auto
                </button>
              </div>
            </div>

            <!-- Item Type -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Item Type *
              </label>
              <select
                v-model="formData.type"
                required
                @change="generateCode"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option
                  v-for="type in fnbTypes"
                  :key="type.value"
                  :value="type.value"
                >
                  {{ type.label }}
                </option>
              </select>
            </div>
          </div>

          <!-- Row 3: Size and Price -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Size -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Size *
              </label>
              <select
                v-model="formData.size"
                required
                @change="generateCode"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option
                  v-for="size in sizes"
                  :key="size.value"
                  :value="size.value"
                >
                  {{ size.label }}
                </option>
              </select>
            </div>

            <!-- Price -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Price (VND) *
              </label>
              <input
                type="number"
                v-model="formData.price"
                required
                min="0"
                step="1000"
                class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter price in VND"
              />
            </div>
          </div>

          <!-- Image URL -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              v-model="formData.image"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter image URL"
            />
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
          {{ isEditing ? "Update Item" : "Create Item" }}
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
