<script setup lang="ts">
import { ref, computed } from "vue";
import type { UserResult } from "~/composables/useUserDetails";
import type { MembershipTier } from "~~/types/type";
import { CheckCheck, CircleDollarSign } from "lucide-vue-next";

const toast = useToast();

interface Props {
  user: UserResult | null;
}

const props = defineProps<Props>();

const tierConfig = {
  member: {
    color: "from-gray-600 to-gray-800",
    nextTier: "vip",
    requiredSpent: 1000000,
    benefits: [
      "account.memberCard.benefits.member.basic",
      "account.memberCard.benefits.member.points",
    ],
  },
  vip: {
    color: "from-yellow-600 to-yellow-800",
    nextTier: "vvip",
    requiredSpent: 5000000,
    benefits: [
      "account.memberCard.benefits.vip.discount",
      "account.memberCard.benefits.vip.priority",
      "account.memberCard.benefits.vip.earlyAccess",
    ],
  },
  vvip: {
    color: "from-purple-600 to-purple-800",
    nextTier: null,
    requiredSpent: 0,
    benefits: [
      "account.memberCard.benefits.vvip.maxDiscount",
      "account.memberCard.benefits.vvip.exclusiveEvents",
      "account.memberCard.benefits.vvip.personalService",
    ],
  },
};

function getTierKey(tier: string | undefined): MembershipTier {
  if (tier === "vip" || tier === "vvip") return tier;
  return "member";
}

const currentTierConfig = computed(
  () => tierConfig[getTierKey(props.user?.tier)]
);

const progressToNextTier = computed(() => {
  const config = currentTierConfig.value;
  if (!config.nextTier || !props.user) return 100;

  const progress = (props.user.totalSpent / config.requiredSpent) * 100;
  return Math.min(progress, 100);
});

const amountNeededForNextTier = computed(() => {
  const config = currentTierConfig.value;
  if (!config.nextTier || !props.user) return 0;

  return Math.max(0, config.requiredSpent - props.user.totalSpent);
});

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount ?? 0);
};

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("vi-VN");
};
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h1 class="text-2xl font-bold text-white mb-2">
        {{ $t("account.memberCard.title") }}
      </h1>
      <p class="text-gray-400">{{ $t("account.memberCard.subtitle") }}</p>
    </div>

    <!-- Member Card -->
    <div class="relative">
      <div
        :class="[
          'bg-gradient-to-br rounded-xl p-8 text-white relative overflow-hidden',
          currentTierConfig.color,
        ]"
      >
        <!-- Card Content -->
        <div class="relative z-10">
          <div class="flex justify-between items-start mb-8">
            <div>
              <h2 class="text-2xl font-bold">
                {{ user?.username.toUpperCase() }}
              </h2>
              <p class="text-lg opacity-90">
                {{ $t(`account.memberTier.${user?.tier}`) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm opacity-75">
                {{ $t("account.memberCard.memberID") }}
              </p>
              <p class="font-mono text-lg">
                #{{ String(user?.id).padStart(6, "0") }}
              </p>
            </div>
          </div>

          <div class="flex justify-between items-end">
            <div>
              <p class="text-sm opacity-75">
                {{ $t("account.memberCard.points") }}
              </p>
              <p class="text-2xl font-bold">
                {{ user?.points.toLocaleString() }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm opacity-75">
                {{ $t("account.memberCard.memberSince") }}
              </p>
              <p class="font-mono">
                {{ formatDate(user?.createdAt as string) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tier Progress -->
    <div v-if="currentTierConfig.nextTier" class="bg-[#161b22] rounded-lg p-6">
      <h3 class="text-lg font-bold text-white mb-4">
        {{ $t("account.memberCard.tierProgress") }}
      </h3>

      <div class="flex items-center justify-between mb-2">
        <span class="text-gray-400">{{
          $t(`account.memberTier.${user?.tier}`)
        }}</span>
        <span class="text-gray-400">{{
          $t(`account.memberTier.${currentTierConfig.nextTier}`)
        }}</span>
      </div>

      <div class="w-full bg-gray-700 rounded-full h-3 mb-4">
        <div
          class="bg-white h-3 rounded-full transition-all duration-300"
          :style="{ width: `${progressToNextTier}%` }"
        ></div>
      </div>

      <div class="text-center">
        <p class="text-gray-400 mb-1">
          {{ $t("account.memberCard.spendMore") }}
        </p>
        <p class="text-xl font-bold text-white">
          {{ formatCurrency(amountNeededForNextTier) }}
        </p>
        <p class="text-gray-500 text-sm">
          {{ $t("account.memberCard.toUpgrade") }}
          {{ $t(`account.memberTier.${currentTierConfig.nextTier}`) }}
        </p>
      </div>
    </div>

    <!-- Max Tier Message -->
    <div v-else class="bg-[#161b22] rounded-lg p-6 text-center">
      <div class="text-4xl mb-4">🏆</div>
      <h3 class="text-xl font-bold text-white mb-2">
        {{ $t("account.memberCard.maxTier") }}
      </h3>
      <p class="text-gray-400">{{ $t("account.memberCard.maxTierDesc") }}</p>
    </div>

    <!-- Tier Benefits -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h3 class="text-lg font-bold text-white mb-4">
        {{ $t("account.memberCard.currentBenefits") }}
      </h3>

      <div class="space-y-3">
        <div
          v-for="benefit in currentTierConfig.benefits"
          :key="benefit"
          class="flex items-center gap-3"
        >
          <CheckCheck class="text-green-400" />
          <span class="text-gray-300">{{ $t(benefit) }}</span>
        </div>
      </div>
    </div>

    <!-- Membership Statistics -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h3 class="text-lg font-bold text-white mb-4">
        {{ $t("account.memberCard.statistics") }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <CircleDollarSign class="text-yellow-500" />
            <h4 class="font-semibold text-gray-300">
              {{ $t("account.memberCard.totalSpent") }}
            </h4>
          </div>
          <p class="text-2xl font-bold text-white">
            {{ formatCurrency(user?.totalSpent as number) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
