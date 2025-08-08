import { computed, ref } from 'vue'
import { cinemas, screens, seats } from '~/data/sampleData'
import type { Cinema, Screen, Seat } from '~~/types/type'

const getTranslations = (item: { translations: { locale: string; name: string }[] } | undefined) => {
    const fallback = { en: 'N/A', vi: 'N/A' };
    if (!item) return fallback;
    const names = item.translations.reduce((acc, t) => {
        acc[t.locale] = t.name;
        return acc;
    }, {} as Record<string, string>);
    return {
        en: names.en || fallback.en,
        vi: names.vi || fallback.vi,
    };
};

export function useAdminManageCinemas() {

    // props for cinemas
    const cinemaSearchQuery = ref('')
    const selectedCity = ref('')
    const cinemaCurrentPage = ref(1)
    const cinemasPerPage = ref(10)

    // props for screens
    const selectedCinemaForScreens = ref('')
    const screenSearchQuery = ref('')
    const screenCurrentPage = ref(1)
    const screensPerPage = ref(10)

    // props for seats
    const selectedCinemaForSeats = ref('')
    const selectedScreenForSeats = ref('')
    const selectedSeatType = ref('')
    const selectedAvailabilityStatus = ref('')
    const seatCurrentPage = ref(1)
    const seatsPerPage = ref(10)

    const allCinemas = computed(() => {
        return cinemas.map(cinema => ({
            ...cinema,
            translatedName: getTranslations(cinema),
            screenCount: screens.filter(s => s.cinemaId === cinema.id).length,
        }));
    });

    const allScreens = computed(() => {
        return screens.map(screen => {
            const parentCinema = cinemas.find(c => c.id === screen.cinemaId);
            return {
                ...screen,
                cinemaTranslatedName: getTranslations(parentCinema),
            };
        });
    });

    const allSeats = computed(() => {
        return seats.map(seat => {
            const parentScreen = screens.find(s => s.id === seat.screenId);
            const parentCinema = parentScreen ? cinemas.find(c => c.id === parentScreen.cinemaId) : undefined;
            return {
                ...seat,
                screenName: parentScreen ? parentScreen.name : 'Unknown Screen',
                cinemaTranslatedName: getTranslations(parentCinema),
            };
        });
    });

    const cinemaStats = computed(() => {
        const totalCinemas = cinemas.length;
        const totalScreens = screens.length;
        const totalCapacity = screens.reduce((acc, screen) => acc + screen.capacity, 0);
        return {
            totalCinemas,
            totalScreens,
            totalCapacity,
        };
    });

    const availableCities = computed(() => {
        const cities = [...new Set(allCinemas.value.map(cinema => cinema.city))];
        return cities.sort();
    });

    const filteredCinemas = computed(() => {
        let result = allCinemas.value;

        // Apply search filter
        if (cinemaSearchQuery.value.trim()) {
            const query = cinemaSearchQuery.value.toLowerCase().trim();
            result = result.filter(cinema =>
                cinema.translatedName.en.toLowerCase().includes(query) ||
                cinema.translatedName.vi.toLowerCase().includes(query)
            );
        }

        // Apply city filter
        if (selectedCity.value) {
            result = result.filter(cinema => cinema.city === selectedCity.value);
        }

        return result;
    });

    const totalCinemaPages = computed(() => {
        return Math.ceil(filteredCinemas.value.length / cinemasPerPage.value);
    });

    const paginatedCinemas = computed(() => {
        const start = (cinemaCurrentPage.value - 1) * cinemasPerPage.value;
        const end = start + cinemasPerPage.value;
        return filteredCinemas.value.slice(start, end);
    });

    const availableScreenCinemas = computed(() => {
        return allCinemas.value;
    });

    const filteredScreens = computed(() => {
        let result = allScreens.value;

        // Apply cinema filter (primary filter)
        if (selectedCinemaForScreens.value) {
            result = result.filter(screen => screen.cinemaId === Number(selectedCinemaForScreens.value));
        }

        // Apply search filter
        if (screenSearchQuery.value.trim()) {
            const query = screenSearchQuery.value.toLowerCase().trim();
            result = result.filter(screen =>
                screen.name.toLowerCase().includes(query)
            );
        }

        return result;
    });

    const totalScreenPages = computed(() => {
        return Math.ceil(filteredScreens.value.length / screensPerPage.value);
    });

    const paginatedScreens = computed(() => {
        const start = (screenCurrentPage.value - 1) * screensPerPage.value;
        const end = start + screensPerPage.value;
        return filteredScreens.value.slice(start, end);
    });

    const availableSeatCinemas = computed(() => {
        return allCinemas.value;
    });

    const availableScreensForSeats = computed(() => {
        if (!selectedCinemaForSeats.value) return [];
        return allScreens.value.filter(screen => screen.cinemaId === Number(selectedCinemaForSeats.value));
    });

    const availableSeatTypes = computed(() => {
        const types = [...new Set(allSeats.value.map(seat => seat.type))];
        return types.sort();
    });

    const filteredSeats = computed(() => {
        let result = allSeats.value;

        if (selectedCinemaForSeats.value) {
            const cinemaScreens = allScreens.value
                .filter(screen => screen.cinemaId === Number(selectedCinemaForSeats.value))
                .map(screen => screen.id);
            result = result.filter(seat => cinemaScreens.includes(seat.screenId));
        }

        if (selectedScreenForSeats.value) {
            result = result.filter(seat => seat.screenId === Number(selectedScreenForSeats.value));
        }

        if (selectedSeatType.value) {
            result = result.filter(seat => seat.type === selectedSeatType.value);
        }

        if (selectedAvailabilityStatus.value) {
            const isAvailable = selectedAvailabilityStatus.value === 'available';
            result = result.filter(seat => seat.isAvailable === isAvailable);
        }

        return result;
    });

    const totalSeatPages = computed(() => {
        return Math.ceil(filteredSeats.value.length / seatsPerPage.value);
    });

    const paginatedSeats = computed(() => {
        const start = (seatCurrentPage.value - 1) * seatsPerPage.value;
        const end = start + seatsPerPage.value;
        return filteredSeats.value.slice(start, end);
    });

    const setCinemaSearchQuery = (query: string) => {
        cinemaSearchQuery.value = query;
        cinemaCurrentPage.value = 1; // Reset to first page when search changes
    };

    const setSelectedCity = (city: string) => {
        selectedCity.value = city;
        cinemaCurrentPage.value = 1; // Reset to first page when filter changes
    };

    const setCinemaCurrentPage = (page: number) => {
        if (page >= 1 && page <= totalCinemaPages.value) {
            cinemaCurrentPage.value = page;
        }
    };

    const resetCinemaFilters = () => {
        cinemaSearchQuery.value = '';
        selectedCity.value = '';
        cinemaCurrentPage.value = 1;
    };


    const setSelectedCinemaForScreens = (cinemaId: string) => {
        selectedCinemaForScreens.value = cinemaId;
        screenSearchQuery.value = ''; // Clear search when cinema changes
        screenCurrentPage.value = 1; // Reset pagination
    };

    const setScreenSearchQuery = (query: string) => {
        screenSearchQuery.value = query;
        screenCurrentPage.value = 1;
    };

    const setScreenCurrentPage = (page: number) => {
        if (page >= 1 && page <= totalScreenPages.value) {
            screenCurrentPage.value = page;
        }
    };

    const resetScreenFilters = () => {
        selectedCinemaForScreens.value = '';
        screenSearchQuery.value = '';
        screenCurrentPage.value = 1;
    };

    const setSelectedCinemaForSeats = (cinemaId: string) => {
        selectedCinemaForSeats.value = cinemaId;
        selectedScreenForSeats.value = ''; // Clear screen selection when cinema changes
        selectedSeatType.value = '';
        selectedAvailabilityStatus.value = '';
        seatCurrentPage.value = 1;
    };

    const setSelectedScreenForSeats = (screenId: string) => {
        selectedScreenForSeats.value = screenId;
        selectedSeatType.value = '';
        selectedAvailabilityStatus.value = '';
        seatCurrentPage.value = 1;
    };

    const setSelectedSeatType = (type: string) => {
        selectedSeatType.value = type;
        seatCurrentPage.value = 1;
    };

    const setSelectedAvailabilityStatus = (status: string) => {
        selectedAvailabilityStatus.value = status;
        seatCurrentPage.value = 1;
    };

    const setSeatCurrentPage = (page: number) => {
        if (page >= 1 && page <= totalSeatPages.value) {
            seatCurrentPage.value = page;
        }
    };

    const resetSeatFilters = () => {
        selectedCinemaForSeats.value = '';
        selectedScreenForSeats.value = '';
        selectedSeatType.value = '';
        selectedAvailabilityStatus.value = '';
        seatCurrentPage.value = 1;
    };

    return {
        allCinemas,
        allScreens,
        allSeats,
        cinemaStats,

        // cinema props
        cinemaSearchQuery,
        selectedCity,
        cinemaCurrentPage,
        cinemasPerPage,
        filteredCinemas,
        paginatedCinemas,
        totalCinemaPages,
        availableCities,
        setCinemaSearchQuery,
        setSelectedCity,
        setCinemaCurrentPage,
        resetCinemaFilters,

        // screen props
        selectedCinemaForScreens,
        screenSearchQuery,
        screenCurrentPage,
        screensPerPage,
        filteredScreens,
        paginatedScreens,
        totalScreenPages,
        availableScreenCinemas,
        setSelectedCinemaForScreens,
        setScreenSearchQuery,
        setScreenCurrentPage,
        resetScreenFilters,

        // seat props
        selectedCinemaForSeats,
        selectedScreenForSeats,
        selectedSeatType,
        selectedAvailabilityStatus,
        seatCurrentPage,
        seatsPerPage,
        filteredSeats,
        paginatedSeats,
        totalSeatPages,
        availableSeatCinemas,
        availableScreensForSeats,
        availableSeatTypes,
        setSelectedCinemaForSeats,
        setSelectedScreenForSeats,
        setSelectedSeatType,
        setSelectedAvailabilityStatus,
        setSeatCurrentPage,
        resetSeatFilters,
    };
}