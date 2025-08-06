import { movieSchedules, timeSlots } from "~/data/sampleData";
import type { Movie } from "~~/types/type";

// Return all showing dates (filtered and deduplicated)
export function useAvailableDates(selectedMovieId: number) {
    const scheduleIds = movieSchedules.filter(ms => ms.movieId === selectedMovieId).map(ms => ms.timeSlotId);
    const dates = [...new Set(timeSlots.filter(ts => scheduleIds.includes(ts.id)).map(ts => ts.date))];
    return { dates };
}
