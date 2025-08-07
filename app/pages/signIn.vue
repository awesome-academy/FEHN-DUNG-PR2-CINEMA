<script setup lang="ts">
import { ref } from "vue";
import { users } from "~/data/sampleData";
import { useUserStore } from "~/stores/user";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const userStore = useUserStore();

const toast = useToast();
const router = useRouter();

const email = ref("");
const password = ref("");

const handleSignIn = () => {
  if (!email.value || !password.value) {
    toast.error({
      message: "Vui lòng nhập email và mật khẩu!",
      position: "topCenter",
    });
    return;
  }
  const findUser = users.find((user) => user.email === email.value);
  if (!findUser) {
    toast.error({
      message: "Tài khoản không tồn tại!",
      position: "topCenter",
    });
    return;
  }
  if (findUser.password !== password.value) {
    toast.error({
      message: "Sai mật khẩu!",
      position: "topCenter",
    });
    return;
  }
  userStore.signInSuccess(findUser);
  toast.success({
    message: "Đăng nhập thành công!",
    position: "topCenter",
  });
  if (findUser.role === "admin") {
    router.push(localePath("/admin"));
  } else {
    router.push(localePath("/"));
  }
};
</script>
<template>
  <div class="bg-[#161623]">
    <div class="container">
      <div class="flex justify-center items-center h-screen mx-auto">
        <div class="w-full md:w-[1000px] bg-[#1f1f2d] text-white">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="hidden md:block md:col-span-1">
              <img
                src="/cinema/cinema-theatre.webp"
                alt="sign in image"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="col-span-1">
              <div class="flex flex-col p-4 md:p-10 gap-4">
                <h2 class="font-semibold text-[26px]">
                  {{ t("signIn.title") }}
                </h2>
                <p class="text-gray-400 text-[18px]">
                  {{ t("signIn.subTitle") }}
                </p>
                <div class="flex flex-col gap-2">
                  <label>{{ t("signIn.email") }}</label>
                  <input
                    type="email"
                    v-model="email"
                    required
                    :placeholder="t('signIn.emailLabel')"
                    class="w-full h-[40px] rounded-[5px] p-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label>{{ t("signIn.password") }}</label>
                  <input
                    type="password"
                    v-model="password"
                    required
                    :placeholder="t('signIn.passwordLabel')"
                    class="w-full h-[40px] rounded-[5px] p-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <span class="w-full flex justify-end text-gray-400">{{
                  t("signIn.forgotPassword")
                }}</span>
                <button
                  @click="handleSignIn"
                  class="w-full h-[40px] bg-red-500 rounded-[5px] flex justify-center items-center hover:cursor-pointer hover:opacity-75"
                >
                  {{ t("signIn.signInBtn") }}
                </button>
                <div class="flex justify-center items-center gap-2">
                  <p>
                    {{ t("signIn.haveAccount") }}
                  </p>
                  <NuxtLink
                    :to="localePath('signUp')"
                    class="text-red-500 hover:text-red-400"
                  >
                    {{ t("signIn.signUpNavigation") }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
