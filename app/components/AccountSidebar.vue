<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  SquareUser,
  UserPen,
  CreditCard,
  Tickets,
  History,
  ChevronUp,
  ChevronDown,
} from "lucide-vue-next";

interface Props {
  activeTab: string;
}

interface Emits {
  (e: "tab-change", tab: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const menuItems = [
  { id: "profile", icon: SquareUser, key: "profile" },
  { id: "account", icon: UserPen, key: "account" },
  { id: "memberCard", icon: CreditCard, key: "memberCard" },
  { id: "voucher", icon: Tickets, key: "voucher" },
  { id: "history", icon: History, key: "history" },
];

const isOpenMenu = ref(true);

const checkScreen = () => {
  isOpenMenu.value = window.innerWidth >= 768;
};

const toggleMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
};

onMounted(() => {
  window.addEventListener("resize", checkScreen);
  checkScreen();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
});
</script>

<template>
  <div class="bg-[#161b22] rounded-lg p-6">
    <div class="flex justify-between items-center mb-2 md:mb-6">
      <h2 class="text-xl font-bold text-white">
        {{ $t("account.sidebar.title") }}
      </h2>
      <span @click="toggleMenu" class="block md:hidden">
        <component
          :is="isOpenMenu ? ChevronUp : ChevronDown"
          class="w-6 h-6 text-white transition-transform duration-200"
        />
      </span>
    </div>

    <nav
      v-show="isOpenMenu"
      :class="[
        isOpenMenu
          ? 'max-h-[300px] opacity-100 scale-y-100'
          : 'max-h-0 opacity-0 scale-y-95',
        'overflow-hidden transition-all duration-300 ease-in-out origin-top',
      ]"
    >
      <button
        v-for="item in menuItems"
        :key="item.id"
        @click="emits('tab-change', item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
          props.activeTab === item.id
            ? 'bg-white text-black'
            : 'text-gray-300 hover:bg-gray-800 hover:text-white',
        ]"
      >
        <!-- Icon -->
        <component
          :is="item.icon"
          class="w-5 h-5"
          :class="props.activeTab === item.id ? 'text-black' : 'text-gray-400'"
        />
        <span>{{ $t(`account.sidebar.${item.key}`) }}</span>
      </button>
    </nav>
  </div>
</template>

<style scoped></style>
