import { computed } from 'vue'
import { users, memberships } from "~/data/sampleData"
import type { MembershipTier } from '~~/types/type'

export function useAdminManageUsers() {
    const combinedUsers = computed(() => {
        return users.map(user => {
            const membership = memberships.find(m => m.userId === user.id);
            return {
                ...user,
                points: membership?.points ?? 0,
                totalSpent: membership?.totalSpent ?? 0,
            }
        })
    });

    const totalMembers = computed(() => {
        return users.filter(u => u.role === 'member').length;
    });

    const tierDistribution = computed(() => {
        const distribution: Record<MembershipTier, number> = { member: 0, vip: 0, vvip: 0 };
        users.forEach(user => {
            if (user.role === 'member' && distribution[user.tier] !== undefined) {
                distribution[user.tier]++;
            }
        });
        return distribution;
    });

    const topMember = computed(() => {
        if (memberships.length === 0) return null;

        const topMembership = [...memberships].sort((a, b) => b.points - a.points)[0];
        if (!topMembership) return null;
        const topUser = users.find(u => u.id === topMembership.userId);

        return topUser ? { ...topUser, points: topMembership.points } : null;
    })
    return {
        combinedUsers,
        totalMembers,
        tierDistribution,
        topMember,
    };
}