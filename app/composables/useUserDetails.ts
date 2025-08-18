import { computed } from "vue";
import { useUserStore } from "~/stores/user";

export interface UserResult {
    id: number,
    username: string,
    email: string,
    password: string,
    phone: string,
    role: string,
    tier: string,
    status: string,
    createdAt: string,
    points: number,
    totalSpent: number
}

export function useUserDetails() {
    const userStore = useUserStore();

    const userDetail = computed<UserResult | null>(() => {
        if (!userStore.currentUser) return null;

        return userStore.currentUser as UserResult;
    });

    return {
        userDetail
    }
}