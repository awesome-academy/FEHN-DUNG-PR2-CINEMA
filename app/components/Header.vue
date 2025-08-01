<script setup lang="ts">
import { Newspaper, Ticket } from "lucide-vue-next";
import { useUserStore } from "~/stores/user";
import { watch } from "vue";

const { t } = useI18n();
const localePath = useLocalePath();
const userStore: any = useUserStore();
const toast = useToast();
const router = useRouter();

const handleSignOut = () => {
  userStore.signOutSuccess();
  toast.success({
    message: "Đăng xuất thành công!",
    position: "topCenter",
  });
  router.push(localePath("/"));
};
</script>

<template>
  <div
    class="bg-[#121212] text-gray-400 h-[50px] py-2 border-b border-slate-600 shadow-md"
  >
    <div class="container">
      <div class="flex justify-end items-center gap-3">
        <div
          class="hidden md:flex justify-center items-center gap-2 hover:cursor-pointer hover:text-white hover:font-semibold"
        >
          <Newspaper :size="16" />
          <div>{{ t("topbar.news") }}</div>
        </div>
        <div class="hidden md:block">|</div>
        <div
          class="hidden md:flex justify-center items-center gap-2 hover:cursor-pointer hover:text-white hover:font-semibold"
        >
          <Ticket :size="16" />
          <div>{{ t("topbar.tickets") }}</div>
        </div>
        <div class="hidden md:block">|</div>
        <template v-if="userStore.currentUser">
          <div
            @click="handleSignOut"
            class="hover:cursor-pointer hover:text-white hover:font-semibold"
          >
            {{ t("topbar.signOut") }}
          </div>
        </template>
        <template v-else>
          <NuxtLink
            :to="localePath('/signIn')"
            class="hover:cursor-pointer hover:text-white hover:font-semibold"
          >
            {{ t("topbar.signIn") }}
          </NuxtLink>
          <div>|</div>
          <NuxtLink
            :to="localePath('/signUp')"
            class="hover:cursor-pointer hover:text-white hover:font-semibold"
          >
            {{ t("topbar.signUp") }}
          </NuxtLink>
        </template>
        <div>|</div>
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
