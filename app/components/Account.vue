<script setup lang="ts">
import { ref, reactive } from "vue";
import type { UserResult } from "~/composables/useUserDetails";
import { useUserStore } from "~/stores/user";

const toast = useToast();
const userStore = useUserStore();

interface Props {
  user: UserResult | null;
}

const props = defineProps<Props>();

const form = reactive({
  username: "",
  email: "",
  phone: "",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

watch(
  () => props.user,
  (user) => {
    if (user) {
      form.username = user.username;
      form.email = user.email;
      form.phone = user.phone;
    }
  },
  { immediate: true }
);

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isProfileChanged = () => {
  if (!props.user) return false;
  return (
    form.username !== props.user.username ||
    form.email !== props.user.email ||
    form.phone !== props.user.phone
  );
};

const handleUpdateProfile = () => {
  if (!form.username || !form.email || !form.phone) {
    toast.error({
      message: "Vui lòng điền đầy đủ thông tin!",
      position: "topCenter",
    });
    return;
  }
  if (!isValidEmail(form.email)) {
    toast.error({ message: "Email không hợp lệ!", position: "topCenter" });
    return;
  }
  if (!isProfileChanged()) {
    toast.info?.({
      message: "Không có thay đổi nào được áp dụng!",
      position: "topCenter",
    });
    return;
  }
  const updatedUser = {
    ...props.user,
    username: form.username,
    email: form.email,
    phone: form.phone,
  };
  userStore.updateSuccess(updatedUser);
  toast.success({
    message: "Cập nhật thông tin thành công!",
    position: "topCenter",
  });
};

const handleChangePassword = () => {
  if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
    toast.error({
      message: "Vui lòng nhập đầy đủ thông tin!",
      position: "topCenter",
    });
    return;
  }
  if (form.newPassword !== form.confirmPassword) {
    toast.error({
      message: "Mật khẩu mới và xác nhận không khớp!",
      position: "topCenter",
    });
    return;
  }
  if (props.user?.password !== form.currentPassword) {
    toast.error({
      message: "Mật khẩu hiện tại không đúng!",
      position: "topCenter",
    });
    return;
  }

  const updatedUser = {
    ...props.user,
    password: form.newPassword,
  };
  userStore.updateSuccess(updatedUser);

  toast.success({ message: "Đổi mật khẩu thành công!", position: "topCenter" });

  form.currentPassword = "";
  form.newPassword = "";
  form.confirmPassword = "";
};
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h1 class="text-2xl font-bold text-white mb-2">
        {{ $t("account.account.title") }}
      </h1>
      <p class="text-gray-400">{{ $t("account.account.subtitle") }}</p>
    </div>

    <!-- Profile Information Form -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h2 class="text-xl font-bold text-white mb-6">
        {{ $t("account.account.profileInfo") }}
      </h2>

      <form @submit.prevent="handleUpdateProfile" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {{ $t("account.account.username") }} *
          </label>
          <input
            v-model="form.username"
            type="text"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            :placeholder="$t('account.account.usernamePlaceholder')"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {{ $t("account.account.email") }} *
          </label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            :placeholder="$t('account.account.emailPlaceholder')"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {{ $t("account.account.phone") }} *
          </label>
          <input
            v-model="form.phone"
            type="tel"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            :placeholder="$t('account.account.phonePlaceholder')"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="!isProfileChanged()"
          class="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ $t("account.account.updateProfile") }}
        </button>
      </form>
    </div>

    <!-- Change Password Form -->
    <div class="bg-[#161b22] rounded-lg p-6">
      <h2 class="text-xl font-bold text-white mb-6">
        {{ $t("account.account.changePassword") }}
      </h2>

      <form @submit.prevent="handleChangePassword" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {{ $t("account.account.currentPassword") }} *
          </label>
          <input
            v-model="form.currentPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            :placeholder="$t('account.account.currentPasswordPlaceholder')"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {{ $t("account.account.newPassword") }} *
          </label>
          <input
            v-model="form.newPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            :placeholder="$t('account.account.newPasswordPlaceholder')"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">
            {{ $t("account.account.confirmPassword") }} *
          </label>
          <input
            v-model="form.confirmPassword"
            type="password"
            class="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            :placeholder="$t('account.account.confirmPasswordPlaceholder')"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="
            !form.currentPassword || !form.newPassword || !form.confirmPassword
          "
          class="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {{ $t("account.account.updatePassword") }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
