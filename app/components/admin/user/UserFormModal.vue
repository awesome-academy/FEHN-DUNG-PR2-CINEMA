<script setup lang="ts">
import { X, User, Save, Shield, UserCheck } from "lucide-vue-next";
import type { MembershipTier } from "~~/types/type";

interface Props {
  isOpen: boolean;
  user?: any | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const formData = ref({
  username: "",
  email: "",
  phone: "",
  role: "member" as "admin" | "member" | "staff",
  tier: "member" as MembershipTier,
  status: "active" as "active" | "inactive" | "banned",
  password: "",
});

const roleOptions = [
  { value: "admin", label: "Admin", icon: Shield },
  { value: "staff", label: "Staff", icon: UserCheck },
  { value: "member", label: "Member", icon: User },
];

const tierOptions = [
  { value: "member", label: "Member", color: "text-gray-400" },
  { value: "vip", label: "VIP", color: "text-yellow-400" },
  { value: "vvip", label: "VVIP", color: "text-purple-400" },
];

const statusOptions = [
  { value: "active", label: "Active", color: "text-green-400" },
  { value: "inactive", label: "Inactive", color: "text-gray-400" },
  { value: "banned", label: "Banned", color: "text-red-400" },
];

watch(
  () => props.user,
  (user) => {
    if (user) {
      formData.value = {
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "member",
        tier: user.tier || "member",
        status: user.status || "active",
        password: "",
      };
    } else {
      formData.value = {
        username: "",
        email: "",
        phone: "",
        role: "member",
        tier: "member",
        status: "active",
        password: "",
      };
    }
  },
  { immediate: true }
);

const isEditing = computed(() => !!props.user);
const modalTitle = computed(() =>
  isEditing.value ? "Edit User" : "Add New User"
);

const handleSave = () => {
  const toast = useToast();

  toast.success({
    message: isEditing.value
      ? `User "${formData.value.username}" updated successfully!`
      : `User "${formData.value.username}" created successfully!`,
    position: "topCenter",
  });

  emit("close");
};

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
    @click="handleClose"
  >
    <!-- Modal panel -->
    <div
      class="bg-[#161b22] rounded-lg border border-gray-700 shadow-xl w-full max-w-[700px] max-h-[90vh] overflow-hidden"
      @click.stop
    >
      <!-- Header -->
      <div class="bg-[#161b22] px-4 py-3 sm:px-6 border-b border-gray-700">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <User class="w-6 h-6 text-blue-500 mr-3" />
            <h3 class="text-lg leading-6 font-medium text-white">
              {{ modalTitle }}
            </h3>
          </div>
          <button
            @click="handleClose"
            class="rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
      </div>

      <!-- Body -->
      <div class="bg-[#161b22] px-4 py-5 sm:p-6 overflow-y-auto max-h-[65vh]">
        <form @submit.prevent="handleSave" class="space-y-6">
          <!-- Username -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Username *
            </label>
            <input
              type="text"
              v-model="formData.username"
              required
              placeholder="Enter username"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              v-model="formData.email"
              required
              placeholder="Enter email address"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Phone
            </label>
            <input
              type="tel"
              v-model="formData.phone"
              placeholder="Enter phone number"
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <!-- Password (for new users or reset) -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Password {{ isEditing ? "(leave blank to keep current)" : "*" }}
            </label>
            <div class="flex gap-2">
              <input
                type="password"
                v-model="formData.password"
                :required="!isEditing"
                placeholder="Enter password"
                class="flex-1 px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Role Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Role *
            </label>
            <select
              v-model="formData.role"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option
                v-for="option in roleOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Tier Selection (only for members) -->
          <div v-if="formData.role === 'member'">
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Membership Tier *
            </label>
            <select
              v-model="formData.tier"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option
                v-for="option in tierOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>

          <!-- Status Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">
              Status *
            </label>
            <select
              v-model="formData.status"
              required
              class="w-full px-3 py-2 bg-[#0d1117] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option
                v-for="option in statusOptions"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
          </div>
        </form>
      </div>

      <!-- Footer -->
      <div
        class="bg-[#161b22] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-700"
      >
        <button
          @click="handleSave"
          class="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors bg-blue-500 hover:bg-blue-600"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ isEditing ? "Update User" : "Create User" }}
        </button>
        <button
          @click="handleClose"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-[#0d1117] text-base font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
