import { defineStore } from 'pinia'
import { memberships } from '~/data/sampleData';

interface UserState {
    currentUser: any | null;
    error: string | null;
    loading: boolean;
    isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        currentUser: null,
        error: null,
        loading: false,
        isLoggedIn: false,
    }),

    actions: {
        resetState() {
            this.currentUser = null;
            this.error = null;
            this.loading = false;
            this.isLoggedIn = false;
            localStorage.removeItem('user');
        },

        signInStart() {
            this.loading = true;
            this.error = null;
        },

        signInSuccess(user: any) {
            const membership = memberships.find(m => m.userId === user.id);
            const fullUserDetails = {
                ...user,
                points: membership?.points ?? 0,
                totalSpent: membership?.totalSpent ?? 0,
            };
            this.currentUser = fullUserDetails;
            this.isLoggedIn = true;
            this.loading = false;
            this.error = null;
            localStorage.setItem('user', JSON.stringify(fullUserDetails));
        },

        signInFailure(err: string) {
            this.error = err;
            this.loading = false;
        },

        signUpStart() {
            this.loading = true;
            this.error = null;
        },

        signUpSuccess() {
            this.loading = false;
            this.error = null;
        },

        signUpFailure(err: string) {
            this.error = err;
            this.loading = false;
        },

        signOutSuccess() {
            this.currentUser = null;
            this.isLoggedIn = false;
            this.loading = false;
            this.error = null;
            localStorage.removeItem('user');
        },

        updateStart() {
            this.loading = true;
            this.error = null;
        },

        updateSuccess(user: any) {
            this.currentUser = user;
            this.loading = false;
            this.error = null;
            localStorage.setItem('user', JSON.stringify(user));
        },

        updateFailure(err: string) {
            this.loading = false;
            this.error = err;
        },

        updateUserSpending(amount: number) {
            if (!this.currentUser) return;

            this.currentUser.totalSpent += amount;

            // 10,000 VND = 1 point
            const newPoints = Math.floor(amount / 10000);
            this.currentUser.points += newPoints;

            localStorage.setItem('user', JSON.stringify(this.currentUser));
        },

        restoreUserFromLocal() {
            try {
                const data = localStorage.getItem('user');
                if (data) {
                    this.currentUser = JSON.parse(data);
                    this.isLoggedIn = true;
                }
            } catch (e) {
                this.currentUser = null;
                this.isLoggedIn = false;
            }
        }
    },
});
