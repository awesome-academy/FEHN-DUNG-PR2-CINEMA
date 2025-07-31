<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.restoreUserFromLocal();
});
</script>
<template>
  <div>
    <Header />
    <slot />
    <Footer />
  </div>
</template>
