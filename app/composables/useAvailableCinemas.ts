import { movieSchedules, cinemas, timeSlots } from "~/data/sampleData";
import type { Movie, Screen } from "~~/types/type";

// Get cinemas showing the selected movie on the selected date
export function useAvailableCinemas(
    selectedMovieId: number,
    selectedDate: string
) {
    // 1. Lấy ra tất cả lịch chiếu của phim đã chọn
    const schedules = movieSchedules.filter(ms => ms.movieId === selectedMovieId);

    // 2. Lấy ra tất cả time slots ứng với ngày đã chọn
    const slots = timeSlots.filter(ts => ts.date === selectedDate);

    // 3. Tìm ra các cinemaId có suất chiếu của phim đó vào ngày đó
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