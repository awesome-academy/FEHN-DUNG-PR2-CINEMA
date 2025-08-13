<script setup lang="ts">
import UserList from "./UserList.vue";
import MembershipList from "./MembershipList.vue";

defineProps<{
  activeTab: string;
}>();
</script>

<template>
  <div class="min-h-screen">
    <UserList v-if="activeTab === 'users'" />
    <MembershipList v-if="activeTab === 'memberships'" />
  </div>
</template>
