import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { SoldInvoiceResult, TicketDetail, SoldFnbDetail } from '~/composables/useSoldInvoiceDetail'
import type { Movie, Cinema, Screen, TimeSlot, Seat, FnbItem, User } from '~~/types/type'

import {
    movies as allMovies,
    cinemas as allCinemas,
    screens as allScreens,
    timeSlots as allTimeSlots,
    seats as allSeats,
    fnbItems as allFnbItems,
    movieSchedules as allMovieSchedules,
} from '~/data/sampleData'

function getTranslation<T extends { locale: string }>(translations: T[], locale: string): T | undefined {
    return translations.find(t => t.locale === locale) || translations[0];
}

export interface CreateOrderPayload {
    currentUser: User;
    selectedMovieId: number;
    selectedCinemaId: number;
    selectedScheduleId: number;
    selectedSeatIds: number[];
    selectedFnbItems: { fnbItem: FnbItem; quantity: number }[];
    totalPrice: number;
    paymentMethod: 'cash' | 'online';
}

interface OrderState {
    orders: SoldInvoiceResult[];
    loading: boolean;
    error: string | null;
}

export const useOrderStore = defineStore('order', () => {
    const orders = ref<SoldInvoiceResult[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    function loadOrdersFromStorage() {
        if (typeof window !== 'undefined') {
            try {
                const savedOrders = localStorage.getItem('orders');
                if (savedOrders) {
                    orders.value = JSON.parse(savedOrders);
                }
            } catch (e) {
                console.error("Failed to parse orders from localStorage:", e);
                orders.value = [];
            }
        }
    }

    loadOrdersFromStorage();

    if (typeof window !== 'undefined') {
        watch(orders, (newOrders) => {
            localStorage.setItem('orders', JSON.stringify(newOrders));
        }, { deep: true });
    }

    const createOrder = (payload: CreateOrderPayload, locale: string) => {
        loading.value = true;
        error.value = null;

        try {
            const {
                currentUser,
                selectedMovieId,
                selectedCinemaId,
                selectedScheduleId,
                selectedSeatIds,
                selectedFnbItems,
                totalPrice,
                paymentMethod,
            } = payload;

            // Get details to create TicketDetail
            const movie = allMovies.find(m => m.id === selectedMovieId);
            const cinema = allCinemas.find(c => c.id === selectedCinemaId);
            const schedule = allMovieSchedules.find(sch => sch.id === selectedScheduleId);
            const screen = allScreens.find(s => s.id === schedule?.screenId);
            const timeSlot = allTimeSlots.find(ts => ts.id === schedule?.timeSlotId);

            const detailedTickets: TicketDetail[] = selectedSeatIds.map(seatId => {
                const seat = allSeats.find(s => s.id === seatId);
                return {
                    id: Math.floor(Math.random() * 100000),
                    price: seat?.price ?? 0,
                    movieScheduleId: selectedScheduleId,
                    seatId: seatId,
                    soldInvoiceId: 0,
                    status: 'paid',
                    createdAt: new Date().toISOString(),
                    movieName: movie ? getTranslation(movie.translations, locale)?.name ?? 'N/A' : 'N/A',
                    moviePoster: movie?.posterImg ?? '',
                    cinemaName: cinema ? getTranslation(cinema.translations, locale)?.name ?? 'N/A' : 'N/A',
                    screenName: screen?.name ?? 'N/A',
                    screenType: screen?.type ?? 'standard',
                    seatRow: seat?.row ?? '?',
                    seatColumn: seat?.column ?? '?',
                    date: timeSlot?.date ?? 'N/A',
                    startTime: timeSlot?.startTime ?? 'N/A',
                    endTime: timeSlot?.endTime ?? 'N/A',
                };
            });

            // Get details to create SoldFnbDetail 
            const detailedFnbs: SoldFnbDetail[] = selectedFnbItems.map(item => ({
                id: Math.floor(Math.random() * 100000),
                soldInvoiceId: 0,
                fnbItemId: item.fnbItem.id,
                quantity: item.quantity,
                pricePerItem: item.fnbItem.price,
                name: getTranslation(item.fnbItem.translations, locale)?.name ?? 'N/A',
                image: item.fnbItem.image,
                size: item.fnbItem.size,
            }));

            // Create master invoice
            const newInvoiceId = Math.max(...orders.value.map(o => o.id), 0) + 1;
            const newInvoice: SoldInvoiceResult = {
                id: newInvoiceId,
                code: `INV-${new Date().getFullYear()}-${newInvoiceId}`,
                date: new Date().toISOString(),
                customerId: currentUser.id,
                staffId: 2,
                paymentMethod: paymentMethod,
                createdAt: new Date().toISOString(),
                customerName: currentUser.username,
                tickets: detailedTickets.map(t => ({ ...t, soldInvoiceId: newInvoiceId })),
                soldFnbs: detailedFnbs.map(fnb => ({ ...fnb, soldInvoiceId: newInvoiceId })),
                totalPrice: totalPrice,
            };

            // Add to top of list
            orders.value.unshift(newInvoice);

            loading.value = false;
            return newInvoice;
        } catch (e: any) {
            error.value = e.message || 'Failed to create order.';
            loading.value = false;
        }
    };

    const getOrdersByUserId = (userId: number) => {
        return orders.value.filter(order => order.customerId === userId);
    };

    const clearOrders = () => {
        try {
            orders.value = [];
            localStorage.removeItem('orders');
        } catch (e) {
            console.error("Failed to clear orders:", e);
        }
    };

    return {
        orders,
        loading,
        error,
        createOrder,
        getOrdersByUserId,
        clearOrders
    };
});