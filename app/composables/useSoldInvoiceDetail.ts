import { computed, type Ref } from "vue";
import {
    soldInvoices as allSoldInvoices,
    tickets as allTickets,
    users as allUsers,
    movieSchedules as allMovieSchedules,
    seats as allSeats,
    cinemas as allCinemas,
    movies as allMovies,
    screens as allScreens,
    timeSlots as allTimeSlots,
    fnbItems as allFnbItems,
    soldFnbs as allSoldFnbs
} from "~/data/sampleData";
import type { SoldFnb, Ticket, SoldInvoice } from "~~/types/type";

export interface TicketDetail extends Ticket {
    movieName: string;
    moviePoster: string;
    cinemaName: string;
    screenName: string;
    screenType: string;
    seatRow: string;
    seatColumn: string;
    date: string;
    startTime: string;
    endTime: string;
}

export interface SoldFnbDetail extends SoldFnb {
    name: string;
    image: string;
    size: 'S' | 'M' | 'L';
}

export interface SoldInvoiceResult extends SoldInvoice {
    customerName: string;
    tickets: TicketDetail[];
    soldFnbs: SoldFnbDetail[];
    totalPrice: number;
}

export function useSoldInvoiceDetails(userId: Ref<number | undefined>, locale: Ref<string>) {

    const soldInvoiceDetails = computed<SoldInvoiceResult[]>(() => {
        if (!userId.value) return [];

        const userInvoices = allSoldInvoices.filter(invoice => invoice.customerId === userId.value);

        return userInvoices.map(invoice => {
            const customer = allUsers.find(u => u.id === invoice.customerId);
            let totalPrice = 0;

            // 1. Xử lý vé
            const invoiceTickets = allTickets.filter(ticket => ticket.soldInvoiceId === invoice.id);
            const detailedTickets: TicketDetail[] = invoiceTickets.map(ticket => {
                const schedule = allMovieSchedules.find(s => s.id === ticket.movieScheduleId);
                const movie = allMovies.find(m => m.id === schedule?.movieId);
                const cinema = allCinemas.find(c => c.id === schedule?.cinemaId);
                const screen = allScreens.find(s => s.id === schedule?.screenId);
                const timeSlot = allTimeSlots.find(ts => ts.id === schedule?.timeSlotId);
                const seat = allSeats.find(s => s.id === ticket.seatId);

                totalPrice += ticket.price;

                const movieTranslation = movie?.translations.find(t => t.locale === locale.value) ?? movie?.translations.find(t => t.locale === 'en');
                const cinemaTranslation = cinema?.translations.find(t => t.locale === locale.value) ?? cinema?.translations.find(t => t.locale === 'en');

                return {
                    ...ticket,
                    movieName: movieTranslation?.name ?? 'Unknown Movie',
                    moviePoster: movie?.posterImg ?? '',
                    cinemaName: cinemaTranslation?.name ?? 'Unknown Cinema',
                    screenName: screen?.name ?? 'N/A', screenType: screen?.type ?? 'standard',
                    seatRow: seat?.row ?? 'N/A', seatColumn: seat?.column ?? 'N/A',
                    date: timeSlot?.date ?? 'N/A', startTime: timeSlot?.startTime ?? 'N/A', endTime: timeSlot?.endTime ?? 'N/A',
                };
            });

            // 2. Xử lý F&B
            const invoiceFnbs = allSoldFnbs.filter(fnb => fnb.soldInvoiceId === invoice.id);
            const detailedFnbs: SoldFnbDetail[] = invoiceFnbs.map(soldFnb => {
                const fnbItem = allFnbItems.find(item => item.id === soldFnb.fnbItemId);

                totalPrice += soldFnb.pricePerItem * soldFnb.quantity;

                const fnbTranslation = fnbItem?.translations.find(t => t.locale === locale.value) ?? fnbItem?.translations.find(t => t.locale === 'en');

                return {
                    ...soldFnb,
                    name: fnbTranslation?.name ?? 'Unknown Item',
                    image: fnbItem?.image ?? '',
                    size: fnbItem?.size ?? 'M',
                };
            });

            return {
                ...invoice,
                customerName: customer?.username ?? 'Unknown Customer',
                tickets: detailedTickets,
                soldFnbs: detailedFnbs,
                totalPrice: totalPrice,
            };
        });
    });

    return {
        soldInvoiceDetails
    };
}