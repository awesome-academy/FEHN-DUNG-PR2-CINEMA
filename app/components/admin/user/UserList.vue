<script setup lang="ts">
import { useAdminManageUsers } from "~/composables/useAdminManageUsers";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-vue-next";
import UserFormModal from "./UserFormModal.vue";

const {
  userSearchQuery,
  userCurrentPage,
  usersPerPage,
  paginatedUsers,
  totalUserPages,
  filteredUsers,
  combinedUsers,
} = useAdminManageUsers();

const toast = useToast();

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    case "staff":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30";
    case "member":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "inactive":
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
    case "banned":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const showCreateModal = ref(false);
const showEditModal = ref(false);
const editingUser = ref(null);

const openEditModal = (user: any) => {
  editingUser.value = user;
  showEditModal.value = true;
};

const closeCreateModal = () => {
  showCreateModal.value = false;
};

const closeEditModal = () => {
  showEditModal.value = false;
  editingUser.value = null;
};
</script>

<template>
  <div class="space-y-6 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <h1 class="text-2xl md:text-3xl font-bold text-white">User Management</h1>

      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        <Plus class="w-4 h-4 mr-2" />
        Add User
      </button>
    </div>

    <!-- Controls Section -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg p-4 md:p-6">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <Filter class="w-5 h-5 text-gray-400" />
          <h3 class="text-lg font-medium text-white">Search Users</h3>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 flex-1 lg:max-w-2xl">
          <!-- Search Input -->
          <div class="relative flex-1">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <Search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              v-model="userSearchQuery"
              placeholder="Search users by name..."
              class="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Reset Button -->
          <button
            @click="userSearchQuery = ''"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mt-4 text-sm text-gray-400">
        Showing {{ paginatedUsers.length }} of {{ filteredUsers.length }} users
        <span v-if="userSearchQuery" class="text-blue-400"> (filtered) </span>
      </div>
    </div>

    <!-- Users Table -->
    <div class="bg-[#161b22] border border-gray-700 rounded-lg">
      <div class="p-4 md:p-6 border-b border-gray-700">
        <h2 class="text-lg md:text-xl font-semibold text-white">All Users</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-[#0d1117]">
            <tr>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
                User
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-300 hidden sm:table-cell"
              >
                Role
              </th>
              <th class="text-left py-3 px-4 text-sm font-medium text-gray-300">
                Status
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-300 hidden md:table-cell"
              >
                Joined Date
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-300 hidden lg:table-cell"
              >
                Points
              </th>
              <th
                class="text-left py-3 px-4 text-sm font-medium text-gray-300 w-20"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginatedUsers"
              :key="user.id"
              class="border-b border-gray-800 hover:bg-gray-700/20 transition-colors"
            >
              <!-- User Info -->
              <td class="py-4 px-4">
                <div class="min-w-0">
                  <div class="text-white font-medium truncate">
                    {{ user.username }}
                  </div>
                  <div class="text-gray-400 text-sm truncate">
                    {{ user.email }}
                  </div>
                  <!-- Mobile: Show role when hidden -->
                  <div class="sm:hidden mt-1">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium capitalize',
                        getRoleBadgeClass(user.role),
                      ]"
                    >
                      {{ user.role }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Role Badge (hidden on mobile) -->
              <td class="py-4 px-4 hidden sm:table-cell">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium capitalize',
                    getRoleBadgeClass(user.role),
                  ]"
                >
                  {{ user.role }}
                </span>
              </td>

              <!-- Status Badge -->
              <td class="py-4 px-4">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-medium capitalize',
                    getStatusBadgeClass(user.status),
                  ]"
                >
                  {{ user.status }}
                </span>
                <!-- Mobile: Show additional info -->
                <div class="md:hidden mt-1 text-xs text-gray-400">
                  {{ formatDate(user.createdAt) }}
                </div>
              </td>

              <!-- Joined Date (hidden on mobile/tablet) -->
              <td class="py-4 px-4 text-gray-300 text-sm hidden md:table-cell">
                {{ formatDate(user.createdAt) }}
              </td>

              <!-- Points (hidden on mobile/tablet) -->
              <td class="py-4 px-4 text-gray-300 text-sm hidden lg:table-cell">
                <span
                  v-if="user.role === 'member'"
                  class="text-yellow-400 font-medium"
                >
                  {{ user.points.toLocaleString() }}
                </span>
                <span v-else class="text-gray-500">-</span>
              </td>

              <!-- Actions -->
              <td class="py-4 px-4 md:px-6">
                <div class="flex flex-col sm:flex-row gap-2">
                  <button
                    @click="openEditModal(user)"
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    class="flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-500 hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <tr v-if="paginatedUsers.length === 0">
        <td colspan="4" class="py-8 px-4 md:px-6 text-center">
          <div class="text-gray-400">
            <Tags class="w-12 h-12 mx-auto mb-4 text-gray-600" />
            <p class="text-lg font-medium mb-2">No users found</p>
            <p class="text-sm">
              {{
                userSearchQuery
                  ? "Try adjusting your search criteria"
                  : "No users available"
              }}
            </p>
          </div>
        </td>
      </tr>
    </div>

    <!-- Pagination Controls -->
    <div
      v-if="totalUserPages > 1"
      class="bg-[#161b22] border border-gray-700 rounded-lg p-4"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-400">
          <span>Page {{ userCurrentPage }} of {{ totalUserPages }}</span>
          <span class="ml-4">({{ filteredUsers.length }} total users)</span>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="userCurrentPage = userCurrentPage - 1"
            :disabled="userCurrentPage <= 1"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              userCurrentPage <= 1
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            <ChevronLeft class="w-4 h-4 mr-1" />
            Previous
          </button>

          <!-- Page Numbers -->
          <div class="hidden sm:flex items-center gap-1">
            <template v-for="page in Math.min(totalUserPages, 5)" :key="page">
              <button
                @click="userCurrentPage = page"
                :class="[
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  page === userCurrentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-[#0d1117] border border-gray-600',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="totalUserPages > 5" class="px-2 text-gray-500"
              >...</span
            >
          </div>

          <button
            @click="userCurrentPage = userCurrentPage + 1"
            :disabled="userCurrentPage >= totalUserPages"
            :class="[
              'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
              userCurrentPage >= totalUserPages
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-white bg-[#0d1117] border border-gray-600 hover:bg-gray-600',
            ]"
          >
            Next
            <ChevronRight class="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  </div>

  <UserFormModal
    :is-open="showCreateModal"
    :user="null"
    @close="closeCreateModal"
  />

  <UserFormModal
    :is-open="showEditModal"
    :user="editingUser"
    @close="closeEditModal"
  />
</template>
