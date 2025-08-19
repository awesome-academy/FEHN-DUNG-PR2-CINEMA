import { movieSchedules, screens, timeSlots } from "~/data/sampleData";
import type { Movie } from "~~/types/type";

// Get all screen types for the selected movie on the selected date at the selected cinema
export function useAvailableScreenTypes(
    selectedMovieId: number,
    selectedDate: string,
    selectedCinemaId: number
) {
    // 1) Lấy tất cả lịch chiếu của PHIM ở RẠP đã chọn
    const schedulesForCinema = movieSchedules.filter(ms =>
        ms.movieId === selectedMovieId && ms.cinemaId === selectedCinemaId
    );

    // 2) Lấy các timeSlot tương ứng các lịch chiếu trên, nhưng CHỈ giữ slot thuộc NGÀY đã chọn
    const scheduleIds = schedulesForCinema.map(ms => ms.timeSlotId);
    const slots = timeSlots.filter(ts => scheduleIds.includes(ts.id) && ts.date === selectedDate);

    // 3) Từ các lịch chiếu ban đầu, chỉ giữ những lịch có timeSlot thuộc NGÀY đã chọn rồi map ra screenId của các lịch hợp lệ
    const screenIds = schedulesForCinema
        .filter(ms => slots.some(slot => slot.id === ms.timeSlotId))
        .map(ms => ms.screenId);

    // 4) Lấy ra TYPE của các screen nói trên và loại trùng (Set)
    const types = [...new Set(screens.filter(s => screenIds.includes(s.id)).map(s => s.type))];
    return { screenTypes: types };
}