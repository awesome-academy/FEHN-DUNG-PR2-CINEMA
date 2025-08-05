import { movieSchedules, screens, cinemas, timeSlots } from "~/data/sampleData";
import type { Movie, Screen } from "~~/types/type";

// Get cinemas showing the selected movie on the selected date and screen type
export function useAvailableCinemas(
    selectedMovieId: number,
    selectedDate: string,
    selectedScreenType: Screen["type"]
) {
    const schedules = movieSchedules.filter(ms => ms.movieId === selectedMovieId);
    const slots = timeSlots.filter(ts => ts.date === selectedDate);
    const screenIds = screens.filter(s => s.type === selectedScreenType).map(s => s.id);

    const cinemaIds = [
        ...new Set(
            schedules.filter(ms =>
                slots.some(slot => slot.id === ms.timeSlotId) &&
                screenIds.includes(ms.screenId)
            ).map(ms => ms.cinemaId)
        )
    ];

    const availableCinemas = cinemas.filter(c => cinemaIds.includes(c.id));
    return { cinemas: availableCinemas };
}
