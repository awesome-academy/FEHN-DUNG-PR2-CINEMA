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
import { useRoute, useRouter } from "vue-router";

const route = useRoute();

const activeTabs = ["profile", "account", "memberCard", "voucher", "history"];

const getDefaultTab = () => {
  const tab = route.query.tab;
  return typeof tab === "string" && activeTabs.includes(tab) ? tab : "profile";
};

const activeTab = ref(getDefaultTab());

const handleTabChange = (tab: string) => {
  activeTab.value = tab;
};

watch(
  () => route.query.tab,
  (newTab) => {
    if (typeof newTab === "string" && activeTabs.includes(newTab)) {
      activeTab.value = newTab;
    }
  }
);

const userStore = useUserStore();

const userId = computed(() => userStore.currentUser?.id);

const { userDetail } = useUserDetails(userId);
</script>

<template>
  <div
    class="h-screen overflow-y-scroll overflow-hidden bg-[#0d1117] text-white"
  >
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
