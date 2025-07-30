<template>
  <div
    class="bg-[#121212] text-gray-400 h-[50px] py-2 border-b border-slate-800 shadow-md"
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
        <div class="hover:cursor-pointer hover:text-white hover:font-semibold">
          {{ t("topbar.signIn") }}
        </div>
        <div>|</div>
        <div class="hover:cursor-pointer hover:text-white hover:font-semibold">
          {{ t("topbar.signUp") }}
        </div>
        <div>|</div>
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Newspaper, Ticket } from "lucide-vue-next";
const { t } = useI18n();
</script>

<style scoped></style>
