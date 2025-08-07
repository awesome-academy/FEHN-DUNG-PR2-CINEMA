<script setup lang="ts">
import UserList from "./UserList.vue";
import MembershipList from "./MembershipList.vue";

defineProps<{
  activeTab: string;
}>();
</script>

<template>
  <div class="p-2 md:p-6 w-full overflow-x-scroll">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-white mb-2">User Management</h1>
      <p class="text-gray-400">Manage users and memberships</p>
    </div>

    <div class="bg-[#161b22] rounded-lg border border-gray-700">
      <UserList v-if="activeTab === 'users'" />
      <MembershipList v-if="activeTab === 'memberships'" />
    </div>
  </div>
</template>
