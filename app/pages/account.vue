<script setup lang="ts">
import { ref, watch } from "vue";
import AccountSidebar from "../components/AccountSidebar.vue";
import Profile from "../components/Profile.vue";
import Account from "../components/Account.vue";
import MemberCard from "../components/MemberCard.vue";
import Voucher from "../components/Voucher.vue";
import History from "../components/History.vue";
import { useUserStore } from "~/stores/user";
import { useUserDetails } from "~/composables/useUserDetails";

const activeTab = ref("profile");

const handleTabChange = (tab: string) => {
  activeTab.value = tab;
};

const userStore = useUserStore();

const userId = computed(() => userStore.currentUser?.id);

const { userDetail } = useUserDetails(userId);
</script>

<template>
  <div class="h-screen overflow-y-scroll bg-[#0d1117] text-white">
    <Navbar />
    <div class="container">
      <div class="flex flex-col md:flex-row gap-8 py-8">
        <div class="md:w-1/4">
          <AccountSidebar
            :active-tab="activeTab"
            @tab-change="handleTabChange"
          />
        </div>

        <div class="flex-1">
          <Profile v-if="activeTab === 'profile'" :user="userDetail" />
          <Account v-else-if="activeTab === 'account'" :user="userDetail" />
          <MemberCard
            v-else-if="activeTab === 'memberCard'"
            :user="userDetail"
          />
          <Voucher v-else-if="activeTab === 'voucher'" :user="userDetail" />
          <History v-else-if="activeTab === 'history'" :user="userDetail" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
