import { defineStore } from 'pinia'
import { cinemas } from '~/data/sampleData';
import type { Cinema } from '~~/types/type';;

interface CinemaState {
    allCinemas: Cinema[];
    favoriteCinemaId: number | null;
    error: string | null;
    loading: boolean;
}

const FAVORITE_CINEMA_STORAGE_KEY = 'favorite_cinema_id';

export const useCinemaStore = defineStore('cinema', {
    state: (): CinemaState => ({
        allCinemas: cinemas,
        favoriteCinemaId: null,
        error: null,
        loading: false,
    }),

    getters: {
        favoriteCinemaDetails(state) {
            if (!state.favoriteCinemaId) return null;

            const favorite = state.allCinemas.find(c => c.id === state.favoriteCinemaId);
            if (!favorite) return null;

            const { locale } = useI18n();
            const currentLocale = locale.value;

            const translation = favorite.translations.find(t => t.locale === currentLocale) || favorite.translations[0];

            return {
                id: favorite.id,
                name: translation?.name || '',
                description: translation?.description || '',
                address: favorite.address,
                city: favorite.city,
                mapUrl: favorite.mapUrl,
            };
        }
    },

    actions: {
        setFavoriteCinema(cinemaId: number) {
            this.loading = true;
            try {
                const cinemaExists = this.allCinemas.some(c => c.id === cinemaId);
                if (cinemaExists) {
                    this.favoriteCinemaId = cinemaId;
                    localStorage.setItem(FAVORITE_CINEMA_STORAGE_KEY, cinemaId.toString());
                    this.error = null;
                } else {
                    throw new Error(`Cinema with ID ${cinemaId} not found.`);
                }
            } catch (e: any) {
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        },

        clearFavoriteCinema() {
            this.favoriteCinemaId = null;
            localStorage.removeItem(FAVORITE_CINEMA_STORAGE_KEY);
        },

        restoreFavoriteCinemaFromLocal() {
            try {
                const storedId = localStorage.getItem(FAVORITE_CINEMA_STORAGE_KEY);
                if (storedId) {
                    const cinemaId = parseInt(storedId, 10);
                    if (this.allCinemas.some(c => c.id === cinemaId)) {
                        this.favoriteCinemaId = cinemaId;
                    } else {
                        localStorage.removeItem(FAVORITE_CINEMA_STORAGE_KEY);
                    }
                }
            } catch (e) {
                this.favoriteCinemaId = null;
            }
        }
    },
});