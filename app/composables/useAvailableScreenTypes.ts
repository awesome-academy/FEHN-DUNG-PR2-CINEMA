import { movieSchedules, screens, timeSlots } from "~/data/sampleData";
import type { Movie } from "~~/types/type";

// Get all screen types for the selected movie on the selected date
export function useAvailableScreenTypes(selectedMovieId: number, selectedDate: string) {
    const scheduleIds = movieSchedules.filter(ms => ms.movieId === selectedMovieId).map(ms => ms.timeSlotId);
    const slots = timeSlots.filter(ts => scheduleIds.includes(ts.id) && ts.date === selectedDate);
    const screenIds = movieSchedules.filter(ms =>
        ms.movieId === selectedMovieId &&
        slots.some(slot => slot.id === ms.timeSlotId)
    ).map(ms => ms.screenId);
    const types = [...new Set(screens.filter(s => screenIds.includes(s.id)).map(s => s.type))];
    return { screenTypes: types };
}
