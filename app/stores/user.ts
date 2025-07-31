import { defineStore } from 'pinia'

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
            this.currentUser = user;
            this.isLoggedIn = true;
            this.loading = false;
            this.error = null;
            localStorage.setItem('user', JSON.stringify(user));
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
