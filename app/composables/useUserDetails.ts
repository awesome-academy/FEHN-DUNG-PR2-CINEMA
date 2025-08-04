import { computed } from "vue";
import { users as allUsers, memberships as allMemberships } from "~/data/sampleData";
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

export function useUserDetails(userId: Ref<number | undefined>) {
    const userStore = useUserStore();

    const userDetail = computed<UserResult | null>(() => {
        const user = userStore.currentUser && userStore.currentUser.id === userId.value
            ? userStore.currentUser
            : null;
        if (!user) return null;

        const membership = allMemberships.find(m => m.userId === userId.value);

        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            phone: user.phone,
            role: user.role,
            tier: user.tier,
            status: user.status,
            createdAt: user.createdAt,
            points: membership?.points ?? 0,
            totalSpent: membership?.totalSpent ?? 0
        }
    });
    return {
        userDetail
    }
}