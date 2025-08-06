import { ref, computed } from "vue";
import { useAvailableMovies } from "./useAvailableMovies";
import { useAvailableDates } from "./useAvailableDates";
import { useAvailableScreenTypes } from "./useAvailableScreenTypes";
import { useAvailableCinemas } from "./useAvailableCinemas";
import { useAvailableSchedules } from "./useAvailableSchedules";
import { useAvailableSeats } from "./useAvailableSeats";
import { useAvailableFnb } from "./useAvailableFnb";
import type { Movie, Screen, Cinema, TimeSlot, FnbItem, Seat } from "~~/types/type";

export type BookingStep =
    | "selectMovie"
    | "selectDate"
    | "selectScreenType"
    | "selectCinema"
    | "selectSchedule"
    | "selectSeat"
    | "selectFnb"
    | "review"
    | "payment";

export function useBookingFlow() {
    const currentStep = ref<BookingStep>("selectMovie");

    const selectedMovieId = ref<number | null>(null);
    const selectedDate = ref<string | null>(null);
    const selectedScreenType = ref<Screen["type"] | null>(null);
    const selectedCinemaId = ref<number | null>(null);
    const selectedScheduleId = ref<number | null>(null);
    const selectedSeatIds = ref<number[]>([]);
    const selectedFnbItems = ref<{ fnbItem: FnbItem; quantity: number }[]>([]);

    // 1. Choose movie
    const { movies } = useAvailableMovies();

    const initializeWithMovie = (movieId: number) => {
        const movieExists = movies.some(m => m.id === movieId);
        if (movieExists) {
            selectMovie(movieId);
        } else {
            console.error(`Movie with ID ${movieId} not found.`);
            resetFlow();
        }
    };

    // 2. Choose date
    const dates = computed(() =>
        selectedMovieId.value ? useAvailableDates(selectedMovieId.value) : { dates: [] }
    );

    // 3. Choose screen type
    const screenTypes = computed(() =>
        selectedMovieId.value && selectedDate.value
            ? useAvailableScreenTypes(selectedMovieId.value, selectedDate.value)
            : { screenTypes: [] }
    );

    // 4. Choose cinema
    const cinemas = computed(() =>
        selectedMovieId.value && selectedDate.value && selectedScreenType.value
            ? useAvailableCinemas(
                selectedMovieId.value,
                selectedDate.value,
                selectedScreenType.value
            )
            : { cinemas: [] }
    );

    // 5. Choose movie schedule
    const schedules = computed(() =>
        selectedMovieId.value &&
            selectedDate.value &&
            selectedScreenType.value &&
            selectedCinemaId.value
            ? useAvailableSchedules(
                selectedMovieId.value,
                selectedDate.value,
                selectedScreenType.value,
                selectedCinemaId.value
            )
            : { schedules: [] }
    );

    // 6. Choose seat
    const seatInfo = computed(() =>
        selectedScheduleId.value
            ? useAvailableSeats(selectedScheduleId.value)
            : { availableSeats: [] as Seat[], bookedSeatIds: [] as number[] }
    );
    const availableSeats = computed(() => seatInfo.value.availableSeats);
    const bookedSeatIds = computed(() => seatInfo.value.bookedSeatIds);

    // 7. Choose FNB
    const { fnbItems } = useAvailableFnb();

    const ticketsPrice = computed(() => {
        if (!selectedSeatIds.value.length || !availableSeats.value.length) {
            return 0;
        }
        const selectedFullSeats = availableSeats.value.filter(seat =>
            selectedSeatIds.value.includes(seat.id)
        );
        return selectedFullSeats.reduce((total, seat) => total + seat.price, 0);
    });

    const fnbPrice = computed(() => {
        if (!selectedFnbItems.value.length) {
            return 0;
        }
        return selectedFnbItems.value.reduce(
            (total, item) => total + item.fnbItem.price * item.quantity,
            0
        );
    });

    const totalPrice = computed(() => ticketsPrice.value + fnbPrice.value);

    const nextStep = () => {
        const steps: BookingStep[] = [
            "selectMovie",
            "selectDate",
            "selectScreenType",
            "selectCinema",
            "selectSchedule",
            "selectSeat",
            "selectFnb",
            "review",
            "payment",
        ];
        const idx = steps.indexOf(currentStep.value);
        const next = steps[idx + 1];
        if (next) currentStep.value = next;
    };

    const prevStep = () => {
        const steps: BookingStep[] = [
            "selectMovie",
            "selectDate",
            "selectScreenType",
            "selectCinema",
            "selectSchedule",
            "selectSeat",
            "selectFnb",
            "review",
            "payment",
        ];
        const idx = steps.indexOf(currentStep.value);
        const prev = steps[idx - 1];
        if (prev) currentStep.value = prev;
    };

    const resetFlow = () => {
        currentStep.value = "selectMovie";
        selectedMovieId.value = null;
        selectedDate.value = null;
        selectedScreenType.value = null;
        selectedCinemaId.value = null;
        selectedScheduleId.value = null;
        selectedSeatIds.value = [];
        selectedFnbItems.value = [];
    };

    const selectMovie = (movieId: number) => {
        selectedMovieId.value = movieId;
        selectedDate.value = null;
        selectedScreenType.value = null;
        selectedCinemaId.value = null;
        selectedScheduleId.value = null;
        selectedSeatIds.value = [];
        selectedFnbItems.value = [];
        currentStep.value = "selectDate";
    };

    const selectDate = (date: string) => {
        selectedDate.value = date;
        selectedScreenType.value = null;
        selectedCinemaId.value = null;
        selectedScheduleId.value = null;
        selectedSeatIds.value = [];
        selectedFnbItems.value = [];
        currentStep.value = "selectScreenType";
    };

    const selectScreenType = (type: Screen["type"]) => {
        selectedScreenType.value = type;
        selectedCinemaId.value = null;
        selectedScheduleId.value = null;
        selectedSeatIds.value = [];
        selectedFnbItems.value = [];
        currentStep.value = "selectCinema";
    };

    const selectCinema = (cinemaId: number) => {
        selectedCinemaId.value = cinemaId;
        selectedScheduleId.value = null;
        selectedSeatIds.value = [];
        selectedFnbItems.value = [];
        currentStep.value = "selectSchedule";
    };

    const selectSchedule = (scheduleId: number) => {
        selectedScheduleId.value = scheduleId;
        selectedSeatIds.value = [];
        currentStep.value = "selectSeat";
    };

    const selectSeat = (seatId: number) => {
        if (selectedSeatIds.value.includes(seatId)) {
            selectedSeatIds.value = selectedSeatIds.value.filter(id => id !== seatId);
        } else {
            selectedSeatIds.value.push(seatId);
        }
    };

    const finishSeatSelection = () => {
        currentStep.value = "selectFnb";
    };

    const selectFnb = (fnbItem: FnbItem, quantity: number) => {
        const index = selectedFnbItems.value.findIndex(f => f.fnbItem.id === fnbItem.id);
        if (index >= 0 && index < selectedFnbItems.value.length) {
            if (quantity > 0) {
                selectedFnbItems.value[index]!.quantity = quantity;
            } else {
                selectedFnbItems.value.splice(index, 1);
            }
        } else {
            if (quantity > 0) selectedFnbItems.value.push({ fnbItem, quantity });
        }
    };

    const finishFnbSelection = () => {
        currentStep.value = "review";
    };

    const proceedToPayment = () => {
        currentStep.value = "payment";
    };

    return {
        currentStep,
        nextStep,
        prevStep,
        resetFlow,

        selectedMovieId,
        selectedDate,
        selectedScreenType,
        selectedCinemaId,
        selectedScheduleId,
        selectedSeatIds,
        selectedFnbItems,

        movies,
        dates,
        screenTypes,
        cinemas,
        schedules,
        availableSeats,
        bookedSeatIds,
        fnbItems,

        ticketsPrice,
        fnbPrice,
        totalPrice,

        initializeWithMovie,
        selectMovie,
        selectDate,
        selectScreenType,
        selectCinema,
        selectSchedule,
        selectSeat,
        finishSeatSelection,
        selectFnb,
        finishFnbSelection,
        proceedToPayment,
    };
}
