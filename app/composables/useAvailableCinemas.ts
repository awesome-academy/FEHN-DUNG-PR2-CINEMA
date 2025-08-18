import { movieSchedules, cinemas, timeSlots } from "~/data/sampleData";
import type { Movie, Screen } from "~~/types/type";

// Get cinemas showing the selected movie on the selected date
export function useAvailableCinemas(
    selectedMovieId: number,
    selectedDate: string
) {
    const schedules = movieSchedules.filter(ms => ms.movieId === selectedMovieId);
    const slots = timeSlots.filter(ts => ts.date === selectedDate);

    const cinemaIds = [
        ...new Set(
            schedules
                .filter(ms => slots.some(slot => slot.id === ms.timeSlotId))
                .map(ms => ms.cinemaId)
        )
    ];

    const availableCinemas = cinemas.filter(c => cinemaIds.includes(c.id));
    return { cinemas: availableCinemas };
}