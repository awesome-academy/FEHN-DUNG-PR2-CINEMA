<script setup lang="ts">
import { ref, computed } from "vue";
import type { UserResult } from "~/composables/useUserDetails";
import type { MembershipTier } from "~~/types/type";
import { UserCheck, Trophy, Star, DollarSign } from "lucide-vue-next";

interface Props {
  user: UserResult | null;
}

const { t } = useI18n();

const props = defineProps<Props>();

const tierColors = {
  member: "text-gray-400",
  vip: "text-yellow-400",
  vvip: "text-purple-400",
};

const tierBadgeColors = {
  member: "bg-gray-700 text-gray-300",
  vip: "bg-yellow-900 text-yellow-400",
  vvip: "bg-purple-900 text-purple-400",
};

const tierKey = computed<MembershipTier>(() => {
  if (props.user?.tier === "vip" || props.user?.tier === "vvip")
    return props.user.tier;
  return "member";
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

const memberSince = computed(() => {
  if (!props.user?.createdAt) return "-";
  const date = new Date(props.user.createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  if (years > 0) {
    return `${years} ${t(
      `profile.${years > 1 ? "years" : "year"}`
    )} ${months} ${t(`account.profile.${months > 1 ? "months" : "month"}`)}`;
  }
  return `${months} ${t(`account.profile.${months > 1 ? "months" : "month"}`)}`;
});
</script>

<template>
  <div class="space-y-6">
    <!-- Profile Header -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <div class="flex items-center gap-6">
        <div
          class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center"
        >
          <span class="text-gray-400 flex justify-center items-center">
            <UserCheck class="w-[30px] h-[30px]" />
          </span>
        </div>

        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <h1 class="text-2xl font-bold text-white">{{ user?.username }}</h1>
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium uppercase',
                tierBadgeColors[tierKey],
              ]"
            >
              {{ $t(`account.memberTier.${user?.tier}`) }}
            </span>
          </div>

          <p class="text-gray-400 mb-1">{{ user?.email }}</p>
          <p class="text-gray-500 text-sm">
            {{ $t("account.profile.memberSince") }}: {{ memberSince }}
          </p>
        </div>
      </div>
    </div>

    <!-- Membership Overview -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h2 class="text-xl font-bold text-white mb-4">
        {{ $t("account.profile.membershipOverview") }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Current Tier -->
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <Trophy class="text-[18px] text-yellow-400" />
            <h3 class="font-semibold text-gray-300">
              {{ $t("account.profile.currentTier") }}
            </h3>
          </div>
          <p :class="['text-xl font-bold', tierColors[tierKey]]">
            {{ $t(`account.memberTier.${user?.tier}`) }}
          </p>
        </div>

        <!-- Total Points -->
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <Star class="text-[18px] text-yellow-400" />
            <h3 class="font-semibold text-gray-300">
              {{ $t("account.profile.totalPoints") }}
            </h3>
          </div>
          <p class="text-xl font-bold text-white">
            {{ user?.points.toLocaleString() }}
          </p>
        </div>

        <!-- Total Spent -->
        <div class="bg-gray-800 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <DollarSign class="text-[18px] text-green-400" />

            <h3 class="font-semibold text-gray-300">
              {{ $t("account.profile.totalSpent") }}
            </h3>
          </div>
          <p class="text-xl font-bold text-white">
            {{ formatCurrency(user?.totalSpent as number) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Account Information -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h2 class="text-xl font-bold text-white mb-4">
        {{ $t("account.profile.accountInfo") }}
      </h2>

      <div class="space-y-4">
        <div
          class="flex justify-between items-center py-3 border-b border-gray-700"
        >
          <span class="text-gray-400">{{
            $t("account.profile.username")
          }}</span>
          <span class="text-white">{{ user?.username }}</span>
        </div>

        <div
          class="flex justify-between items-center py-3 border-b border-gray-700"
        >
          <span class="text-gray-400">{{ $t("account.profile.email") }}</span>
          <span class="text-white">{{ user?.email }}</span>
        </div>

        <div
          class="flex justify-between items-center py-3 border-b border-gray-700"
        >
          <span class="text-gray-400">{{ $t("account.profile.phone") }}</span>
          <span class="text-white">{{ user?.phone }}</span>
        </div>

        <div
          class="flex justify-between items-center py-3 border-b border-gray-700"
        >
          <span class="text-gray-400">{{ $t("account.profile.status") }}</span>
          <span class="text-green-400 capitalize">{{ user?.status }}</span>
        </div>

        <div class="flex justify-between items-center py-3">
          <span class="text-gray-400">{{
            $t("account.profile.joinedDate")
          }}</span>
          <span class="text-white">{{
            formatDate(user?.createdAt as string)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
