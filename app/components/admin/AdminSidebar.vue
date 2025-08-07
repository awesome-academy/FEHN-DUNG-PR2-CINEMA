<script setup lang="ts">
import {
  LayoutDashboard,
  User,
  Film,
  Clapperboard,
  Ticket,
  Calendar,
  Popcorn,
  ChevronDown,
  LogOut,
  Settings,
  UserCircle,
  X,
} from "lucide-vue-next";
import { useUserStore } from "~/stores/user";

interface OpenSections {
  users: boolean;
  movies: boolean;
  cinemas: boolean;
  tickets: boolean;
  events: boolean;
  fnb: boolean;
}

defineEmits<{
  navigate: [page: string];
  close: [];
}>();

defineProps<{
  activeItem: string;
  isOpen: boolean;
}>();

const userStore = useUserStore();
const router = useRouter();
const localePath = useLocalePath();
const toast = useToast();

const openSections = ref<OpenSections>({
  users: false,
  movies: false,
  cinemas: false,
  tickets: false,
  events: false,
  fnb: false,
});

const showUserMenu = ref(false);

const toggleSection = (section: keyof OpenSections) => {
  openSections.value[section] = !openSections.value[section];
};

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value;
};

const handleSignOut = async () => {
  try {
    userStore.signOutSuccess();
    toast.success({
      message: "Đăng xuất thành công!",
      position: "topCenter",
    });
    router.push(localePath("/"));
  } catch (error) {
    console.error("Sign out error:", error);
  }
};

const getUserInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const currentUser = computed(() => userStore.currentUser);
const userName = computed(() => currentUser.value?.username);
const userEmail = computed(() => currentUser.value?.email);
</script>

<template>
  <div
    :class="[
      'fixed left-0 top-0 h-screen bg-[#161b22] border-r border-gray-700 overflow-y-auto flex flex-col z-50 transition-transform duration-300 ease-in-out',
      'w-64 md:w-64',
      isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      'md:w-64',
      isOpen ? 'w-1/3 min-w-[280px]' : 'w-1/3',
    ]"
  >
    <div class="p-6">
      <h2 class="text-xl font-bold text-white mb-8">Cinema Admin</h2>
    </div>

    <div class="flex-1 px-6 pb-4">
      <nav class="space-y-2">
        <!-- Dashboard -->
        <div>
          <button
            @click="$emit('navigate', 'dashboard')"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
              activeItem === 'dashboard'
                ? 'bg-blue-500 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            ]"
          >
            <LayoutDashboard class="w-4 h-4" />
            Dashboard
          </button>
        </div>

        <!-- Manage Users -->
        <div>
          <button
            @click="toggleSection('users')"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div class="flex items-center gap-2">
              <User class="w-4 h-4" />
              Manage Users
            </div>
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                openSections.users ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-show="openSections.users" class="ml-6 mt-1 space-y-1">
            <button
              @click="$emit('navigate', 'users')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'users'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Users
            </button>
            <button
              @click="$emit('navigate', 'memberships')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'memberships'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Memberships
            </button>
          </div>
        </div>

        <!-- Manage Movies -->
        <div>
          <button
            @click="toggleSection('movies')"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div class="flex items-center gap-2">
              <Film class="w-4 h-4" />
              Manage Movies
            </div>
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                openSections.movies ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-show="openSections.movies" class="ml-6 mt-1 space-y-1">
            <button
              @click="$emit('navigate', 'movies')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'movies'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Movies
            </button>
            <button
              @click="$emit('navigate', 'genres')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'genres'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Genres
            </button>
            <button
              @click="$emit('navigate', 'movie-schedules')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'movie-schedules'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Movie Schedules
            </button>
            <button
              @click="$emit('navigate', 'timeslots')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'timeslots'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Timeslots
            </button>
          </div>
        </div>

        <!-- Manage Cinemas -->
        <div>
          <button
            @click="toggleSection('cinemas')"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div class="flex items-center gap-2">
              <Clapperboard class="w-4 h-4" />
              Manage Cinemas
            </div>
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                openSections.cinemas ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-show="openSections.cinemas" class="ml-6 mt-1 space-y-1">
            <button
              @click="$emit('navigate', 'cinemas')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'cinemas'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Cinemas
            </button>
            <button
              @click="$emit('navigate', 'screens')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'screens'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Screens
            </button>
            <button
              @click="$emit('navigate', 'seats')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'seats'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Seats
            </button>
          </div>
        </div>

        <!-- Manage Tickets -->
        <div>
          <button
            @click="toggleSection('tickets')"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div class="flex items-center gap-2">
              <Ticket class="w-4 h-4" />
              Manage Tickets
            </div>
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                openSections.tickets ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-show="openSections.tickets" class="ml-6 mt-1 space-y-1">
            <button
              @click="$emit('navigate', 'tickets')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'tickets'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Tickets
            </button>
            <button
              @click="$emit('navigate', 'sold-invoices')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'sold-invoices'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Sold Invoices
            </button>
            <button
              @click="$emit('navigate', 'sold-fnb')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'sold-fnb'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Sold F&B
            </button>
          </div>
        </div>

        <!-- Manage Events -->
        <div>
          <button
            @click="toggleSection('events')"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div class="flex items-center gap-2">
              <Calendar class="w-4 h-4" />
              Manage Events
            </div>
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                openSections.events ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-show="openSections.events" class="ml-6 mt-1 space-y-1">
            <button
              @click="$emit('navigate', 'vouchers')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'vouchers'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Vouchers
            </button>
            <button
              @click="$emit('navigate', 'events')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'events'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              Events
            </button>
          </div>
        </div>

        <!-- Manage F&B -->
        <div>
          <button
            @click="toggleSection('fnb')"
            class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
          >
            <div class="flex items-center gap-2">
              <Popcorn class="w-4 h-4" />
              Manage F&B
            </div>
            <ChevronDown
              :class="[
                'w-4 h-4 transition-transform',
                openSections.fnb ? 'rotate-180' : '',
              ]"
            />
          </button>

          <div v-show="openSections.fnb" class="ml-6 mt-1 space-y-1">
            <button
              @click="$emit('navigate', 'fnb-items')"
              :class="[
                'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                activeItem === 'fnb-items'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white',
              ]"
            >
              F&B Items
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div class="border-t border-gray-700 p-4 relative">
      <div
        v-show="showUserMenu"
        class="absolute bottom-full left-4 right-4 mb-2 bg-[#21262d] border border-gray-600 rounded-lg shadow-lg py-2 z-50"
      >
        <button
          @click="$emit('navigate', 'profile')"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
        >
          <Settings class="w-4 h-4" />
          Profile Settings
        </button>
        <div class="border-t border-gray-600 my-1"></div>
        <button
          @click="handleSignOut"
          class="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
        >
          <LogOut class="w-4 h-4" />
          Sign Out
        </button>
      </div>

      <button
        @click="toggleUserMenu"
        class="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition-colors group"
      >
        <div class="flex-shrink-0">
          <div
            v-if="currentUser?.avatar"
            class="w-8 h-8 rounded-full bg-cover bg-center border border-gray-600"
            :style="{ backgroundImage: `url(${currentUser.avatar})` }"
          ></div>
          <div
            v-else
            class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold border border-gray-600"
          >
            {{ getUserInitials(userName) }}
          </div>
        </div>

        <div class="flex-1 text-left min-w-0">
          <div class="text-sm font-medium text-white truncate">
            {{ userName }}
          </div>
          <div class="text-xs text-gray-400 truncate">
            {{ userEmail }}
          </div>
        </div>

        <ChevronDown
          :class="[
            'w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-200',
            showUserMenu ? 'rotate-180' : '',
          ]"
        />
      </button>
    </div>
  </div>
</template>
