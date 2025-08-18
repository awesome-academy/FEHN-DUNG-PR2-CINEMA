import { movieSchedules, screens, timeSlots } from "~/data/sampleData";
import type { Movie } from "~~/types/type";

// Get all screen types for the selected movie on the selected date at the selected cinema
export function useAvailableScreenTypes(
    selectedMovieId: number,
    selectedDate: string,
    selectedCinemaId: number
) {
    const schedulesForCinema = movieSchedules.filter(ms =>
        ms.movieId === selectedMovieId && ms.cinemaId === selectedCinemaId
    );

    const scheduleIds = schedulesForCinema.map(ms => ms.timeSlotId);
    const slots = timeSlots.filter(ts => scheduleIds.includes(ts.id) && ts.date === selectedDate);

    const screenIds = schedulesForCinema
        .filter(ms => slots.some(slot => slot.id === ms.timeSlotId))
        .map(ms => ms.screenId);

    const types = [...new Set(screens.filter(s => screenIds.includes(s.id)).map(s => s.type))];
    return { screenTypes: types };
}