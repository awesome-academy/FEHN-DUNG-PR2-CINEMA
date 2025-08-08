<script setup lang="ts">
import { useAdminManageUsers } from "~/composables/useAdminManageUsers";
import { Users, Crown, TrendingUp } from "lucide-vue-next";

const { combinedUsers, totalMembers, tierDistribution, topMember } =
  useAdminManageUsers();

const memberships = computed(() => {
  return combinedUsers.value.filter(
    (user) => user.role === "member" && user.points > 0
  );
});

const getTierClass = (tier: string) => {
  switch (tier) {
    case "vip":
      return "text-yellow-400 font-medium";
    case "vvip":
      return "text-purple-400 font-medium";
    default:
      return "text-gray-300";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};
</script>

<template>
  <div class="p-2 md:p-6">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-white">Membership Management</h2>
      <p class="text-gray-400 text-sm mt-1">
        Track membership statistics and member details
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-[#0d1117] rounded-lg border border-gray-700 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-400 text-sm">Total Members</p>
            <p class="text-2xl font-bold text-white mt-1">{{ totalMembers }}</p>
          </div>
          <div class="bg-blue-500/20 p-3 rounded-lg">
            <Users class="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div class="bg-[#0d1117] rounded-lg border border-gray-700 p-6">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-400 text-sm">Tier Distribution</p>
          <div class="bg-yellow-500/20 p-3 rounded-lg">
            <Crown class="w-6 h-6 text-yellow-400" />
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-300">Member</span>
            <span class="text-white font-medium">{{
              tierDistribution.member
            }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-yellow-400">VIP</span>
            <span class="text-white font-medium">{{
              tierDistribution.vip
            }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-purple-400">VVIP</span>
            <span class="text-white font-medium">{{
              tierDistribution.vvip
            }}</span>
          </div>
        </div>
      </div>

      <div class="bg-[#0d1117] rounded-lg border border-gray-700 p-6">
        <div class="flex items-center justify-between mb-3">
          <p class="text-gray-400 text-sm">Top Member</p>
          <div class="bg-purple-500/20 p-3 rounded-lg">
            <TrendingUp class="w-6 h-6 text-purple-400" />
          </div>
        </div>
        <div v-if="topMember">
          <p class="text-white font-medium">{{ topMember.username }}</p>
          <p class="text-yellow-400 text-sm font-medium">
            {{ topMember.points.toLocaleString() }} points
          </p>
        </div>
        <div v-else>
          <p class="text-gray-400 text-sm">No data available</p>
        </div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full md:min-w-[800px]">
        <thead>
          <tr class="border-b border-gray-700">
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
              Member ID
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
              Username
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
              Tier
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
              Points
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
              Total Spent
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
              Joined Date
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="member in memberships"
            :key="member.id"
            class="border-b border-gray-800 hover:bg-gray-700/20 transition-colors"
          >
            <td class="py-4 px-4 text-gray-300 text-sm font-mono">
              #{{ member.id.toString().padStart(4, "0") }}
            </td>

            <td class="py-4 px-4">
              <div class="text-white font-medium">{{ member.username }}</div>
              <div class="text-gray-400 text-sm">{{ member.email }}</div>
            </td>

            <td class="py-4 px-4">
              <span
                :class="['capitalize font-medium', getTierClass(member.tier)]"
              >
                {{ member.tier }}
              </span>
            </td>

            <td class="py-4 px-4">
              <span class="text-yellow-400 font-medium">
                {{ member.points.toLocaleString() }}
              </span>
            </td>

            <td class="py-4 px-4">
              <span class="text-green-400 font-medium">
                {{ formatCurrency(member.totalSpent) }}
              </span>
            </td>

            <td class="py-4 px-4 text-gray-300 text-sm">
              {{ formatDate(member.createdAt) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="memberships.length === 0" class="text-center py-8">
        <p class="text-gray-400">No membership data found</p>
      </div>
    </div>
  </div>
</template>
