import { computed, ref } from 'vue';
import {
    tickets,
    soldInvoices,
    soldFnbs,
    users,
    movies,
    movieSchedules,
    seats,
    cinemas,
    screens,
    fnbItems
} from '~/data/sampleData';
import type { Ticket, SoldInvoice, SoldFnb, FnbItem } from '~~/types/type';

const getTranslations = (item: { translations: { locale: string; name: string }[] } | undefined) => {
    const fallback = { en: 'N/A', vi: 'N/A' };
    if (!item) return fallback;
    const names = item.translations.reduce((acc, t) => {
        acc[t.locale] = t.name;
        return acc;
    }, {} as Record<string, string>);
    return {
        en: names.en || fallback.en,
        vi: names.vi || fallback.vi,
    };
};

export function useAdminManageTickets() {
    // --- State for Tickets Tab ---
    const ticketSearchQuery = ref('');
    const selectedTicketStatus = ref('');
    const ticketCurrentPage = ref(1);
    const ticketsPerPage = ref(10);

    // --- State for Invoices Tab ---
    const invoiceSearchQuery = ref('');
    const selectedPaymentMethod = ref('');
    const invoiceCurrentPage = ref(1);
    const invoicesPerPage = ref(10);

    // --- State for Sold F&B Tab ---
    const soldFnbSearchQuery = ref('');
    const soldFnbCurrentPage = ref(1);
    const soldFnbsPerPage = ref(10);

    // --- Base Computed Properties ---

    const allTickets = computed(() => {
        return tickets.map(ticket => {
            const schedule = movieSchedules.find(ms => ms.id === ticket.movieScheduleId);
            const movie = schedule ? movies.find(m => m.id === schedule.movieId) : undefined;
            const seat = seats.find(s => s.id === ticket.seatId);
            const invoice = soldInvoices.find(i => i.id === ticket.soldInvoiceId);
            const user = invoice ? users.find(u => u.id === invoice.customerId) : undefined;

            return {
                ...ticket,
                movieName: movie ? getTranslations(movie) : { en: 'N/A', vi: 'N/A' },
                seatInfo: seat ? `${seat.row}${seat.column}` : 'N/A',
                customerName: user ? user.username : 'N/A',
                invoiceCode: invoice ? invoice.code : 'N/A'
            };
        });
    });

    const allInvoices = computed(() => {
        return soldInvoices.map(invoice => {
            const customer = users.find(u => u.id === invoice.customerId);
            const staff = users.find(u => u.id === invoice.staffId);
            const ticketsForInvoice = tickets.filter(t => t.soldInvoiceId === invoice.id);
            const fnbForInvoice = soldFnbs.filter(fnb => fnb.soldInvoiceId === invoice.id);

            const totalAmount = ticketsForInvoice.reduce((sum, t) => sum + t.price, 0) +
                fnbForInvoice.reduce((sum, fnb) => sum + (fnb.pricePerItem * fnb.quantity), 0);

            return {
                ...invoice,
                customerName: customer?.username ?? 'N/A',
                staffName: staff?.username ?? 'N/A',
                itemCount: ticketsForInvoice.length + fnbForInvoice.length,
                totalAmount
            };
        });
    });

    const allSoldFnbs = computed(() => {
        return soldFnbs.map(soldFnb => {
            const fnbItemDetails = fnbItems.find(item => item.id === soldFnb.fnbItemId);
            const invoice = soldInvoices.find(i => i.id === soldFnb.soldInvoiceId);
            return {
                ...soldFnb,
                itemName: fnbItemDetails ? getTranslations(fnbItemDetails) : { en: 'N/A', vi: 'N/A' },
                itemImage: fnbItemDetails ? fnbItemDetails.image : '',
                invoiceCode: invoice ? invoice.code : 'N/A',
                totalPrice: soldFnb.quantity * soldFnb.pricePerItem
            };
        });
    });

    // --- Filtering and Pagination Logic ---

    const filteredTickets = computed(() => {
        let result = allTickets.value;
        if (ticketSearchQuery.value) {
            const query = ticketSearchQuery.value.toLowerCase();
            result = result.filter(t =>
                t.customerName.toLowerCase().includes(query) ||
                t.movieName.en.toLowerCase().includes(query) ||
                t.movieName.vi.toLowerCase().includes(query)
            );
        }
        if (selectedTicketStatus.value) {
            result = result.filter(t => t.status === selectedTicketStatus.value);
        }
        return result;
    });

    const paginatedTickets = computed(() => {
        const start = (ticketCurrentPage.value - 1) * ticketsPerPage.value;
        return filteredTickets.value.slice(start, start + ticketsPerPage.value);
    });

    const totalTicketPages = computed(() => Math.ceil(filteredTickets.value.length / ticketsPerPage.value));

    const filteredInvoices = computed(() => {
        let result = allInvoices.value;
        if (invoiceSearchQuery.value) {
            const query = invoiceSearchQuery.value.toLowerCase();
            result = result.filter(i =>
                i.code.toLowerCase().includes(query) ||
                i.customerName.toLowerCase().includes(query)
            );
        }
        if (selectedPaymentMethod.value) {
            result = result.filter(i => i.paymentMethod === selectedPaymentMethod.value);
        }
        return result;
    });

    const paginatedInvoices = computed(() => {
        const start = (invoiceCurrentPage.value - 1) * invoicesPerPage.value;
        return filteredInvoices.value.slice(start, start + invoicesPerPage.value);
    });

    const totalInvoicePages = computed(() => Math.ceil(filteredInvoices.value.length / invoicesPerPage.value));

    const filteredSoldFnbs = computed(() => {
        let result = allSoldFnbs.value;
        if (soldFnbSearchQuery.value) {
            const query = soldFnbSearchQuery.value.toLowerCase();
            result = result.filter(f =>
                f.itemName.en.toLowerCase().includes(query) ||
                f.itemName.vi.toLowerCase().includes(query) ||
                f.invoiceCode.toLowerCase().includes(query)
            );
        }
        return result;
    });

    const paginatedSoldFnbs = computed(() => {
        const start = (soldFnbCurrentPage.value - 1) * soldFnbsPerPage.value;
        return filteredSoldFnbs.value.slice(start, start + soldFnbsPerPage.value);
    });

    const totalSoldFnbPages = computed(() => Math.ceil(filteredSoldFnbs.value.length / soldFnbsPerPage.value));

    return {
        ticketSearchQuery,
        selectedTicketStatus,
        ticketCurrentPage,
        ticketsPerPage,
        filteredTickets,
        paginatedTickets,
        totalTicketPages,

        // Invoice data
        invoiceSearchQuery,
        selectedPaymentMethod,
        invoiceCurrentPage,
        invoicesPerPage,
        filteredInvoices,
        paginatedInvoices,
        totalInvoicePages,

        // Sold F&B data
        soldFnbSearchQuery,
        soldFnbCurrentPage,
        soldFnbsPerPage,
        filteredSoldFnbs,
        paginatedSoldFnbs,
        totalSoldFnbPages,
    };
}