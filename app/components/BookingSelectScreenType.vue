<script setup lang="ts">
import type { Screen } from "~~/types/type";
import {
  Monitor,
  Crown,
  Maximize,
  Glasses,
  Zap,
  ArrowLeft,
  CheckCircle,
  MonitorX,
} from "lucide-vue-next";

interface Props {
  screenTypes: Screen["type"][];
  selectedType: Screen["type"] | null;
}

interface Emits {
  (e: "select", type: Screen["type"]): void;
  (e: "back"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();

const screenTypeLabels: Record<Screen["type"], string> = {
  standard: t("buyTickets.screenTypes.standard"),
  VIP: t("buyTickets.screenTypes.vip"),
  IMAX: t("buyTickets.screenTypes.imax"),
  "3D": t("buyTickets.screenTypes.3d"),
  "4D": t("buyTickets.screenTypes.4d"),
};

const screenTypeDescriptions: Record<Screen["type"], string> = {
  standard: t("buyTickets.screenTypes.standardDesc"),
  VIP: t("buyTickets.screenTypes.vipDesc"),
  IMAX: t("buyTickets.screenTypes.imaxDesc"),
  "3D": t("buyTickets.screenTypes.3dDesc"),
  "4D": t("buyTickets.screenTypes.4dDesc"),
};

const screenTypeIcons: Record<Screen["type"], any> = {
  standard: Monitor,
  VIP: Crown,
  IMAX: Maximize,
  "3D": Glasses,
  "4D": Zap,
};

const handleTypeSelect = (type: Screen["type"]) => {
  emit("select", type);
};

const handleBack = () => {
  emit("back");
};
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">
        {{ t("buyTickets.selectScreenType.title") }}
      </h2>
      <button
        @click="handleBack"
        class="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft class="w-4 h-4 mr-2" />
        {{ t("buyTickets.common.back") }}
      </button>
    </div>

    <div v-if="screenTypes.length === 0" class="text-center py-8">
      <Monitor class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-400">
        {{ t("buyTickets.selectScreenType.noAvailable") }}
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <button
        v-for="type in screenTypes"
        :key="type"
        @click="handleTypeSelect(type)"
        class="p-6 rounded-lg border-2 transition-all duration-300 hover:scale-105 text-left"
        :class="{
          'border-blue-500 bg-blue-500/20': selectedType === type,
          'border-gray-600 bg-gray-700/50 hover:border-gray-500':
            selectedType !== type,
        }"
      >
        <div class="flex items-start">
          <component
            :is="screenTypeIcons[type]"
            class="w-8 h-8 mr-4 mt-1"
            :class="{
              'text-blue-400': selectedType === type,
              'text-gray-400': selectedType !== type,
            }"
          />

          <div class="flex-1">
            <h3
              class="text-lg font-bold mb-2"
              :class="{
                'text-blue-400': selectedType === type,
                'text-white': selectedType !== type,
              }"
            >
              {{ screenTypeLabels[type] }}
            </h3>
            <p class="text-gray-400">
              {{ screenTypeDescriptions[type] }}
            </p>
            <div
              v-if="selectedType === type"
              class="flex items-center mt-3 text-blue-400"
            >
              <CheckCircle class="w-4 h-4 mr-2" />
              <span class="">{{ t("buyTickets.common.selected") }}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>
