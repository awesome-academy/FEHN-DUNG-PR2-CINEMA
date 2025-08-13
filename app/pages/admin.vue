<script setup lang="ts">
import AdminSidebar from "../components/admin/AdminSidebar.vue";
import AdminDashboard from "../components/admin/Dashboard.vue";
import AdminManageUsers from "~/components/admin/user/AdminManageUsers.vue";
import AdminManageCinemas from "~/components/admin/cinema/AdminManageCinemas.vue";
import { Menu } from "lucide-vue-next";

const currentPage = ref("dashboard");
const sidebarOpen = ref(false);

const handleNavigation = (page: string) => {
  currentPage.value = page;
  if (window.innerWidth < 768) {
    sidebarOpen.value = false;
  }
};

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const closeSidebar = () => {
  sidebarOpen.value = false;
};

definePageMeta({
  layout: "admin",
});
</script>

<template>
  <div class="min-h-screen bg-[#0d1117] flex relative">
    <!-- Mobile Overlay -->
    <div
      v-if="sidebarOpen"
      @click="closeSidebar"
      class="fixed inset-0 bg-black/50 z-40 md:hidden"
    ></div>

    <!-- Sidebar -->
    <AdminSidebar
      :active-item="currentPage"
      :is-open="sidebarOpen"
      @navigate="handleNavigation"
      @close="closeSidebar"
    />

    <!-- Main Content -->
    <div class="flex-1 md:ml-64">
      <!-- Mobile Header -->
      <div class="md:hidden bg-[#161b22] border-b border-gray-700 p-4">
        <button
          @click="toggleSidebar"
          class="text-white hover:text-gray-300 transition-colors"
        >
          <Menu class="w-6 h-6" />
        </button>
      </div>

      <div class="h-full w-full overflow-x-scroll p-2">
        <AdminDashboard v-if="currentPage === 'dashboard'" />
        <AdminManageUsers
          v-if="currentPage === 'users' || currentPage === 'memberships'"
          :active-tab="currentPage"
        />
        <AdminManageCinemas
          v-if="
            currentPage === 'cinemas' ||
            currentPage === 'screens' ||
            currentPage === 'seats'
          "
          :active-tab="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
