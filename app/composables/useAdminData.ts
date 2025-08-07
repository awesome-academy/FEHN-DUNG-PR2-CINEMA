import { computed } from 'vue'
import {
    soldInvoices,
    tickets,
    soldFnbs,
    events,
    fnbItems
} from '~/data/sampleData'

export interface DashboardSummary {
    totalRevenue: number
    ticketsSold: number
    fnbSales: number
    activeEvents: number
}

export interface MonthlyRevenue {
    month: string
    revenue: number
}

export interface SalesBreakdown {
    category: string
    amount: number
    color: string
}

export function useAdminData() {
    const dashboardSummary = computed<DashboardSummary>(() => {
        // Calculate total revenue from all sold invoices
        let totalTicketRevenue = 0
        let totalFnbRevenue = 0
        let ticketsCount = 0

        // Sum up ticket revenue
        tickets.forEach(ticket => {
            if (ticket.status === 'paid') {
                totalTicketRevenue += ticket.price
                ticketsCount++
            }
        })

        // Sum up F&B revenue
        soldFnbs.forEach(fnb => {
            totalFnbRevenue += fnb.pricePerItem * fnb.quantity
        })

        // Count active events
        const currentDate = new Date()
        const activeEventsCount = events.filter(event => {
            const startDate = new Date(event.startDate)
            const endDate = new Date(event.endDate)
            return event.status === 'active' && startDate <= currentDate && endDate >= currentDate
        }).length

        return {
            totalRevenue: totalTicketRevenue + totalFnbRevenue,
            ticketsSold: ticketsCount,
            fnbSales: totalFnbRevenue,
            activeEvents: activeEventsCount
        }
    })

    const monthlyRevenue = computed<MonthlyRevenue[]>(() => {
        const CURRENT_YEAR = new Date().getFullYear();

        const monthsData: MonthlyRevenue[] = Array.from({ length: 12 }, (_, i) => {
            const date = new Date(CURRENT_YEAR, i, 1);
            const monthName = date.toLocaleDateString('en-US', { month: 'short' });
            return {
                month: `${monthName}`,
                revenue: 0,
            };
        });

        const invoiceDateMap = new Map<number, Date>();
        soldInvoices.forEach(invoice => {
            invoiceDateMap.set(invoice.id, new Date(invoice.date));
        });

        tickets.forEach(ticket => {
            if (ticket.status === 'paid') {
                const invoiceDate = invoiceDateMap.get(ticket.soldInvoiceId);
                if (invoiceDate && invoiceDate.getFullYear() === CURRENT_YEAR) {
                    const monthIndex = invoiceDate.getMonth();
                    if (monthsData[monthIndex]) {
                        monthsData[monthIndex].revenue += ticket.price;
                    }
                }
            }
        });

        soldFnbs.forEach(fnb => {
            const invoiceDate = invoiceDateMap.get(fnb.soldInvoiceId);
            if (invoiceDate && invoiceDate.getFullYear() === CURRENT_YEAR) {
                const monthIndex = invoiceDate.getMonth();
                if (monthsData[monthIndex]) {
                    monthsData[monthIndex].revenue += fnb.quantity * fnb.pricePerItem;
                }
            }
        });

        return monthsData;
    });

    const salesBreakdown = computed<SalesBreakdown[]>(() => {
        const ticketRevenue = dashboardSummary.value.totalRevenue - dashboardSummary.value.fnbSales
        const fnbRevenue = dashboardSummary.value.fnbSales

        return [
            {
                category: 'Ticket Sales',
                amount: ticketRevenue,
                color: '#3b82f6'
            },
            {
                category: 'F&B Sales',
                amount: fnbRevenue,
                color: '#ef4444'
            }
        ]
    })

    return {
        dashboardSummary,
        monthlyRevenue,
        salesBreakdown
    }
}