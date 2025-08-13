import { computed, ref } from 'vue'
import { movies, genres, movieSchedules, timeSlots, cinemas, screens } from '~/data/sampleData'

const getTranslations = (
    item: { translations: Array<{ locale: string;[key: string]: any }> } | undefined,
    fields: string[]
) => {
    const fallback: Record<string, any> = {};
    fields.forEach(field => fallback[field] = 'N/A');

    if (!item || !item.translations) {
        return { en: { ...fallback }, vi: { ...fallback } };
    }

    const translations = item.translations.reduce((acc, t) => {
        acc[t.locale] = {};
        fields.forEach(field => {
            acc[t.locale]![field] = t[field] || fallback[field];
        });
        return acc;
    }, {} as Record<string, Record<string, any>>);

    return {
        en: translations.en || { ...fallback },
        vi: translations.vi || { ...fallback },
    };
};

export function useAdminManageMovies() {
    // --- State for Movies Tab ---
    const movieSearchQuery = ref('');
    const selectedGenre = ref<number | ''>('');
    const selectedStatus = ref('');
    const movieCurrentPage = ref(1);
    const moviesPerPage = ref(10);

    // --- State for Genres Tab ---
    const genreSearchQuery = ref('');
    const genreCurrentPage = ref(1);
    const genresPerPage = ref(10);

    // --- State for Schedules Tab ---
    const scheduleSearchQuery = ref('');
    const selectedScheduleCinema = ref<number | ''>('');
    const scheduleCurrentPage = ref(1);
    const schedulesPerPage = ref(10);

    // --- State for Timeslots Tab ---
    const timeslotSearchQuery = ref('');
    const selectedDateFilter = ref('');
    const timeslotCurrentPage = ref(1);
    const timeslotsPerPage = ref(10);

    // --- Base Computed Properties  ---

    const allMovies = computed(() => movies.map(movie => {
        const movieGenres = genres
            .filter(g => movie.genres.includes(g.id))
            .map(g => ({
                id: g.id,
                ...getTranslations(g, ['name'])
            }));
        return {
            ...movie,
            translated: getTranslations(movie, ['name', 'brief', 'description']),
            genreDetails: movieGenres,
        };
    }));

    const allGenres = computed(() => genres.map(genre => ({
        ...genre,
        translatedName: getTranslations(genre, ['name']),
        movieCount: movies.filter(m => m.genres.includes(genre.id)).length,
    })));

    const allMovieSchedules = computed(() => movieSchedules.map(schedule => {
        const movie = movies.find(m => m.id === schedule.movieId);
        const cinema = cinemas.find(c => c.id === schedule.cinemaId);
        const screen = screens.find(s => s.id === schedule.screenId);
        const timeSlot = timeSlots.find(ts => ts.id === schedule.timeSlotId);
        return {
            ...schedule,
            movieName: movie ? getTranslations(movie, ['name']) : { en: { name: 'N/A' }, vi: { name: 'N/A' } },
            cinemaName: cinema ? getTranslations(cinema, ['name']) : { en: { name: 'N/A' }, vi: { name: 'N/A' } },
            screenName: screen ? screen.name : 'N/A',
            timeSlot: timeSlot ? `${timeSlot.startTime} - ${timeSlot.endTime}` : 'N/A',
            date: timeSlot ? timeSlot.date : 'N/A',
        };
    }));

    const allTimeSlots = computed(() => timeSlots);

    // --- Filtering and Pagination Logic ---

    // Movies
    const filteredMovies = computed(() => {
        let result = allMovies.value;
        if (movieSearchQuery.value) {
            const query = movieSearchQuery.value.toLowerCase();
            result = result.filter(m => m.translated.en.name.toLowerCase().includes(query) || m.translated.vi.name.toLowerCase().includes(query));
        }
        if (selectedGenre.value !== '') {
            result = result.filter(m => m.genres.includes(selectedGenre.value as number));
        }
        if (selectedStatus.value) {
            result = result.filter(m => m.status === selectedStatus.value);
        }
        return result;
    });

    const paginatedMovies = computed(() => {
        const start = (movieCurrentPage.value - 1) * moviesPerPage.value;
        return filteredMovies.value.slice(start, start + moviesPerPage.value);
    });

    const totalMoviePages = computed(() => Math.ceil(filteredMovies.value.length / moviesPerPage.value));

    // Genres
    const filteredGenres = computed(() => {
        let result = allGenres.value;
        if (genreSearchQuery.value) {
            const query = genreSearchQuery.value.toLowerCase();
            result = result.filter(g => g.translatedName.en.name.toLowerCase().includes(query) || g.translatedName.vi.name.toLowerCase().includes(query));
        }
        return result;
    });

    const paginatedGenres = computed(() => {
        const start = (genreCurrentPage.value - 1) * genresPerPage.value;
        return filteredGenres.value.slice(start, start + genresPerPage.value);
    });

    const totalGenrePages = computed(() => Math.ceil(filteredGenres.value.length / genresPerPage.value));

    // Schedules
    const filteredSchedules = computed(() => {
        let result = allMovieSchedules.value;
        if (scheduleSearchQuery.value) {
            const query = scheduleSearchQuery.value.toLowerCase();
            result = result.filter(s => s.movieName.en.name.toLowerCase().includes(query) || s.movieName.vi.name.toLowerCase().includes(query));
        }
        if (selectedScheduleCinema.value !== '') {
            result = result.filter(s => s.cinemaId === selectedScheduleCinema.value);
        }
        return result;
    });

    const paginatedSchedules = computed(() => {
        const start = (scheduleCurrentPage.value - 1) * schedulesPerPage.value;
        return filteredSchedules.value.slice(start, start + schedulesPerPage.value);
    });

    const totalSchedulePages = computed(() => Math.ceil(filteredSchedules.value.length / schedulesPerPage.value));

    // Timeslots
    const availableDates = computed(() => {
        const dates = [...new Set(allTimeSlots.value.map((slot) => slot.date))];
        return dates
            .map(date => ({ date, timestamp: new Date(date).getTime() }))
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(obj => obj.date);
    });

    const filteredTimeSlots = computed(() => {
        let result = allTimeSlots.value;
        if (timeslotSearchQuery.value) {
            const query = timeslotSearchQuery.value.toLowerCase();
            result = result.filter(
                (slot) =>
                    slot.startTime.toLowerCase().includes(query) ||
                    slot.endTime.toLowerCase().includes(query) ||
                    slot.date.toLowerCase().includes(query)
            );
        }
        if (selectedDateFilter.value) {
            result = result.filter((slot) => slot.date === selectedDateFilter.value);
        }
        return result.sort((a, b) => {
            const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
            if (dateComparison !== 0) return dateComparison;
            return a.startTime.localeCompare(b.startTime);
        });
    });

    const paginatedTimeSlots = computed(() => {
        const start = (timeslotCurrentPage.value - 1) * timeslotsPerPage.value;
        return filteredTimeSlots.value.slice(start, start + timeslotsPerPage.value);
    });

    const totalTimeslotPages = computed(() => Math.ceil(filteredTimeSlots.value.length / timeslotsPerPage.value));

    return {
        allMovies,
        allGenres,
        allMovieSchedules,
        allTimeSlots,

        // Movie state 
        movieSearchQuery,
        selectedGenre,
        selectedStatus,
        movieCurrentPage,
        moviesPerPage,
        filteredMovies,
        paginatedMovies,
        totalMoviePages,

        // Genre state 
        genreSearchQuery,
        genreCurrentPage,
        genresPerPage,
        filteredGenres,
        paginatedGenres,
        totalGenrePages,

        // Schedule state 
        scheduleSearchQuery,
        selectedScheduleCinema,
        scheduleCurrentPage,
        schedulesPerPage,
        filteredSchedules,
        paginatedSchedules,
        totalSchedulePages,

        // Timeslot state
        timeslotSearchQuery,
        selectedDateFilter,
        timeslotCurrentPage,
        timeslotsPerPage,
        availableDates,
        filteredTimeSlots,
        paginatedTimeSlots,
        totalTimeslotPages,
    };
}