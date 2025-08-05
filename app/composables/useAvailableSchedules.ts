import { movieSchedules, screens, timeSlots } from "~/data/sampleData";
import type { Screen } from "~~/types/type";

// Get all schedules that match the previous filters
export function useAvailableSchedules(
    selectedMovieId: number,
    selectedDate: string,
    selectedScreenType: Screen["type"],
    selectedCinemaId: number
) {
    const validScreenIds = screens
        .filter(s => s.cinemaId === selectedCinemaId && s.type === selectedScreenType)
        .map(s => s.id);

    const availableSchedules = movieSchedules.filter(ms =>
        ms.movieId === selectedMovieId &&
        ms.cinemaId === selectedCinemaId &&
        validScreenIds.includes(ms.screenId)
    );

    const result = availableSchedules
        .map(ms => {
            const timeSlot = timeSlots.find(ts => ts.id === ms.timeSlotId);
            if (timeSlot && timeSlot.date === selectedDate) {
                return {
                    id: ms.id,
                    timeSlot: timeSlot
                };
            }
            return null;
        })
        .filter(Boolean);

    return { schedules: result };
}