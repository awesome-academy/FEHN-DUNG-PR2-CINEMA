<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
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
              <div class="flex flex-col w-full p-4 md:p-10 gap-4">
                <h2 class="font-semibold text-[26px]">
                  {{ t("signUp.title") }}
                </h2>
                <p class="text-gray-400 text-[18px]">
                  {{ t("signUp.subTitle") }}
                </p>
                <div class="flex flex-col gap-2">
                  <label>{{ t("signUp.username") }}</label>
                  <input
                    type="text"
                    :placeholder="t('signUp.usernameLabel')"
                    class="w-full h-[40px] rounded-[5px] p-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label>{{ t("signUp.email") }}</label>
                  <input
                    type="email"
                    :placeholder="t('signUp.emailLabel')"
                    class="w-full h-[40px] rounded-[5px] p-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label>{{ t("signUp.password") }}</label>
                  <input
                    type="password"
                    :placeholder="t('signUp.passwordLabel')"
                    class="w-full h-[40px] rounded-[5px] p-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <label>{{ t("signUp.phone") }}</label>
                  <input
                    type="text"
                    :placeholder="t('signUp.phoneLabel')"
                    class="w-full h-[40px] rounded-[5px] p-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  class="w-full h-[40px] mt-5 bg-red-500 rounded-[5px] flex justify-center items-center hover:cursor-pointer hover:opacity-75"
                >
                  {{ t("signUp.signUpBtn") }}
                </button>
                <div class="flex justify-center items-center gap-2">
                  <p>
                    {{ t("signUp.haveAccount") }}
                  </p>
                  <NuxtLink
                    :to="localePath('/signIn')"
                    class="text-red-500 hover:text-red-400"
                  >
                    {{ t("signUp.signInNavigation") }}
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
