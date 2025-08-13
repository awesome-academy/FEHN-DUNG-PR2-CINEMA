import { computed, ref } from 'vue'
import { users, memberships } from "~/data/sampleData"
import type { MembershipTier } from '~~/types/type'

export function useAdminManageUsers() {
    // State for user management
    const userSearchQuery = ref('');
    const selectedRole = ref<string>('');
    const selectedStatus = ref<string>('');
    const selectedTier = ref<string>('');
    const userCurrentPage = ref(1);
    const usersPerPage = ref(10);

    // Base computed properties
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
    });

    // Filtering and pagination logic
    const filteredUsers = computed(() => {
        let result = combinedUsers.value;

        // Search filter
        if (userSearchQuery.value) {
            const query = userSearchQuery.value.toLowerCase();
            result = result.filter(user =>
                user.username.toLowerCase().includes(query) ||
                user.email.toLowerCase().includes(query) ||
                user.phone.toLowerCase().includes(query)
            );
        }

        // Role filter
        if (selectedRole.value) {
            result = result.filter(user => user.role === selectedRole.value);
        }

        // Status filter
        if (selectedStatus.value) {
            result = result.filter(user => user.status === selectedStatus.value);
        }

        // Tier filter (only for members)
        if (selectedTier.value) {
            result = result.filter(user => user.role === 'member' && user.tier === selectedTier.value);
        }

        return result;
    });

    const paginatedUsers = computed(() => {
        const start = (userCurrentPage.value - 1) * usersPerPage.value;
        return filteredUsers.value.slice(start, start + usersPerPage.value);
    });

    const totalUserPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage.value));

    // Available filter options
    const availableRoles = computed(() => [
        { value: 'admin', label: 'Admin' },
        { value: 'staff', label: 'Staff' },
        { value: 'member', label: 'Member' }
    ]);

    const availableStatuses = computed(() => [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'banned', label: 'Banned' }
    ]);

    const availableTiers = computed(() => [
        { value: 'member', label: 'Member' },
        { value: 'vip', label: 'VIP' },
        { value: 'vvip', label: 'VVIP' }
    ]);

    return {
        // Original properties
        combinedUsers,
        totalMembers,
        tierDistribution,
        topMember,

        // New filtering and pagination
        userSearchQuery,
        selectedRole,
        selectedStatus,
        selectedTier,
        userCurrentPage,
        usersPerPage,
        filteredUsers,
        paginatedUsers,
        totalUserPages,

        // Filter options
        availableRoles,
        availableStatuses,
        availableTiers,
    };
}