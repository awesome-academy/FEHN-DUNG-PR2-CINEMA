import { seats, tickets, movieSchedules } from "~/data/sampleData";
import type { Seat } from "~~/types/type";

// Get all seats for this screen
export function useAvailableSeats(selectedMovieScheduleId: number) {
    const schedule = movieSchedules.find(ms => ms.id === selectedMovieScheduleId);
    if (!schedule) {
        return { availableSeats: [] as Seat[], bookedSeatIds: [] as number[] };
    }

    const allSeatsInScreen = seats.filter(s => s.screenId === schedule.screenId);

    const bookedSeatIds = tickets
        .filter(t => t.movieScheduleId === selectedMovieScheduleId && (t.status === "paid" || t.status === "booked"))
        .map(t => t.seatId);

    const availableSeats = allSeatsInScreen.filter(seat => !bookedSeatIds.includes(seat.id));

    return { availableSeats, bookedSeatIds };
}