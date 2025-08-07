<script setup lang="ts">
import { useAdminManageUsers } from "~/composables/useAdminManageUsers";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next";

const { combinedUsers } = useAdminManageUsers();
const toast = useToast();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5);

const filteredUsers = computed(() => {
  if (!searchQuery.value) return combinedUsers.value;

  return combinedUsers.value.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.status.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value)
);

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

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const resetSearch = () => {
  searchQuery.value = "";
  currentPage.value = 1;
};

const handleAddUser = () => {
  toast.info({
    message: "Create user",
    position: "topCenter",
  });
};

const handleEditUser = (userId: number) => {
  toast.info({
    message: "Edit user",
    position: "topCenter",
  });
};

const handleDeleteUser = (userId: number) => {
  toast.warning({
    message: "Delete user",
    position: "topCenter",
  });
};
</script>

<template>
  <div class="p-4 sm:p-6">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-white">User List</h2>
      <p class="text-gray-400 text-sm mt-1">Manage all system users</p>
    </div>

    <!-- Search and Add Controls -->
    <div class="flex flex-col sm:flex-row gap-4 mb-6">
      <!-- Search Bar -->
      <div class="relative flex-1">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <Search class="h-5 w-5 text-gray-400" />
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full pl-10 pr-4 py-2 bg-[#0d1117] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <!-- Add User Button -->
      <button
        @click="handleAddUser"
        class="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors whitespace-nowrap"
      >
        <Plus class="w-4 h-4" />
        <span class="hidden sm:inline">Add User</span>
        <span class="sm:hidden">Add</span>
      </button>
    </div>

    <!-- Results Info -->
    <div class="mb-4">
      <p class="text-sm text-gray-400">
        Showing {{ paginatedUsers.length }} of {{ filteredUsers.length }} users
        <span v-if="searchQuery"
          >(filtered from {{ combinedUsers.length }} total)</span
        >
      </p>
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto bg-[#0d1117] rounded-lg border border-gray-700">
      <table class="w-full md:min-w-[800px]">
        <thead>
          <tr class="border-b border-gray-700">
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
            <td class="py-4 px-4">
              <div class="flex items-center gap-2">
                <!-- Desktop Actions -->
                <div class="hidden sm:flex items-center gap-1">
                  <button
                    @click="handleEditUser(user.id)"
                    class="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                    title="Edit user"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="handleDeleteUser(user.id)"
                    class="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete user"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>

                <!-- Mobile: Dropdown Menu -->
                <div class="sm:hidden">
                  <button
                    class="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <MoreHorizontal class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Empty State -->
      <div v-if="paginatedUsers.length === 0" class="text-center py-12">
        <p class="text-gray-400 mb-2">
          {{ searchQuery ? "No users match your search" : "No users found" }}
        </p>
        <button
          v-if="searchQuery"
          @click="resetSearch"
          class="text-blue-400 hover:text-blue-300 text-sm"
        >
          Clear search
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4"
    >
      <!-- Items per page -->
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-400">Show:</span>
        <select
          v-model="itemsPerPage"
          @change="currentPage = 1"
          class="bg-[#0d1117] border border-gray-700 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <span class="text-sm text-gray-400">per page</span>
      </div>

      <!-- Pagination Controls -->
      <div class="flex items-center gap-2">
        <!-- Previous Button -->
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          :class="[
            'p-2 rounded-lg border transition-colors',
            currentPage === 1
              ? 'border-gray-700 text-gray-500 cursor-not-allowed'
              : 'border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white',
          ]"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1">
          <template v-if="totalPages <= 7">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 rounded-lg text-sm transition-colors',
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ]"
            >
              {{ page }}
            </button>
          </template>
          <template v-else>
            <!-- Complex pagination for many pages -->
            <button
              @click="goToPage(1)"
              :class="[
                'px-3 py-1 rounded-lg text-sm transition-colors',
                1 === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ]"
            >
              1
            </button>
            <span v-if="currentPage > 3" class="text-gray-500 px-1">...</span>
            <template
              v-for="page in [currentPage - 1, currentPage, currentPage + 1]"
              :key="page"
            >
              <button
                v-if="page > 1 && page < totalPages"
                @click="goToPage(page)"
                :class="[
                  'px-3 py-1 rounded-lg text-sm transition-colors',
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                ]"
              >
                {{ page }}
              </button>
            </template>
            <span v-if="currentPage < totalPages - 2" class="text-gray-500 px-1"
              >...</span
            >
            <button
              @click="goToPage(totalPages)"
              :class="[
                'px-3 py-1 rounded-lg text-sm transition-colors',
                totalPages === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              ]"
            >
              {{ totalPages }}
            </button>
          </template>
        </div>

        <!-- Next Button -->
        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          :class="[
            'p-2 rounded-lg border transition-colors',
            currentPage === totalPages
              ? 'border-gray-700 text-gray-500 cursor-not-allowed'
              : 'border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white',
          ]"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <!-- Page Info -->
      <div class="text-sm text-gray-400 order-first sm:order-last">
        Page {{ currentPage }} of {{ totalPages }}
      </div>
    </div>
  </div>
</template>
