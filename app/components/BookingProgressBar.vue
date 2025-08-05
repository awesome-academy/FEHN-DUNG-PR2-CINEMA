<script setup lang="ts">
import type { BookingStep } from "~/composables/useBookingFlow";
import { Check } from "lucide-vue-next";

interface Props {
  currentStep: BookingStep;
  visibleSteps: BookingStep[];
}

const props = defineProps<Props>();
const { t } = useI18n();

const stepLabels: Record<BookingStep, string> = {
  selectMovie: t("buyTickets.steps.selectMovie"),
  selectDate: t("buyTickets.steps.selectDate"),
  selectScreenType: t("buyTickets.steps.selectScreenType"),
  selectCinema: t("buyTickets.steps.selectCinema"),
  selectSchedule: t("buyTickets.steps.selectSchedule"),
  selectSeat: t("buyTickets.steps.selectSeat"),
  selectFnb: t("buyTickets.steps.selectFnb"),
  review: t("buyTickets.steps.review"),
  payment: t("buyTickets.steps.payment"),
};

const getCurrentStepIndex = () => {
  return props.visibleSteps.indexOf(props.currentStep);
};

const getNextStep = (index: number): BookingStep | undefined =>
  props.visibleSteps[index + 1];

const isStepCompleted = (stepIndex: number) => {
  return stepIndex < getCurrentStepIndex();
};

const isStepActive = (step: BookingStep) => {
  return step === props.currentStep;
};

const isNextStepActive = (index: number) => {
  const step = getNextStep(index);
  return step !== undefined && isStepActive(step);
};
</script>

<template>
  <div class="w-full overflow-x-scroll bg-[#161b22] rounded-lg p-6">
    <div class="flex items-center justify-between">
      <div
        v-for="(step, index) in visibleSteps"
        :key="step"
        class="flex items-center"
        :class="{ 'flex-1': index < visibleSteps.length - 1 }"
      >
        <!-- Step Circle -->
        <div class="flex items-center">
          <div
            class="w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all duration-300"
            :class="{
              'bg-blue-600 text-white': isStepActive(step),
              'bg-green-600 text-white': isStepCompleted(index),
              'bg-gray-600 text-gray-300':
                !isStepActive(step) && !isStepCompleted(index),
            }"
          >
            <Check v-if="isStepCompleted(index)" class="w-5 h-5" />
            <span v-else>{{ index + 1 }}</span>
          </div>

          <!-- Step Label -->
          <div class="ml-3 hidden md:block">
            <p
              class="text-sm font-medium transition-colors duration-300"
              :class="{
                'text-blue-400': isStepActive(step),
                'text-green-400': isStepCompleted(index),
                'text-gray-400': !isStepActive(step) && !isStepCompleted(index),
              }"
            >
              {{ stepLabels[step] }}
            </p>
          </div>
        </div>

        <!-- Progress Line -->
        <div
          v-if="index < visibleSteps.length - 1"
          class="flex-1 h-1 mx-4 rounded-full transition-colors duration-300"
          :class="{
            'bg-green-600': isStepCompleted(index + 1),
            'bg-blue-600': isNextStepActive(index),
            'bg-gray-600':
              !isStepCompleted(index + 1) && !isNextStepActive(index),
          }"
        />
      </div>
    </div>

    <!-- Mobile Step Label -->
    <div class="mt-4 text-center md:hidden">
      <p class="text-blue-400 font-medium">
        {{ stepLabels[currentStep] }}
      </p>
      <p class="text-gray-400 text-sm mt-1">
        {{ t("buyTickets.progress.step") }} {{ getCurrentStepIndex() + 1 }}
        {{ t("buyTickets.progress.of") }} {{ visibleSteps.length }}
      </p>
    </div>
  </div>
</template>
