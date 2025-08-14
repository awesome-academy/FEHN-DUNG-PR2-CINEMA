import { computed, ref } from 'vue';
import { events, vouchers } from '~/data/sampleData';
import type { Event, Voucher } from '~~/types/type';

const getTranslations = (
    item: { translations: Array<{ locale: string;[key: string]: any }> } | undefined,
    fields: string[]
) => {
    const fallback: Record<string, any> = {};
    fields.forEach(field => fallback[field] = 'N/A');

    if (!item || !item.translations) {
        return { en: { ...fallback }, vi: { ...fallback } };
    }

    const translations = item.translations.reduce((acc, t) => {
        acc[t.locale] = {};
        fields.forEach(field => {
            acc[t.locale]![field] = t[field] || fallback[field];
        });
        return acc;
    }, {} as Record<string, Record<string, any>>);

    return {
        en: translations.en || { ...fallback },
        vi: translations.vi || { ...fallback },
    };
};

export function useAdminManageEvents() {
    // --- State for Events Tab ---
    const eventSearchQuery = ref('');
    const selectedEventStatus = ref('');
    const selectedEventType = ref('');
    const eventCurrentPage = ref(1);
    const eventsPerPage = ref(10);

    // --- State for Vouchers Tab ---
    const voucherSearchQuery = ref('');
    const selectedVoucherStatus = ref('');
    const selectedVoucherType = ref('');
    const voucherCurrentPage = ref(1);
    const vouchersPerPage = ref(10);

    // --- Base Computed Properties ---

    const allEvents = computed(() => {
        return events.map(event => ({
            ...event,
            translated: getTranslations(event, ['name', 'description', 'terms']),
        }));
    });

    const allVouchers = computed(() => {
        return vouchers.map(voucher => ({
            ...voucher,
            translated: getTranslations(voucher, ['description']),
        }));
    });

    // --- Filtering and Pagination for Events ---

    const filteredEvents = computed(() => {
        let result = allEvents.value;
        if (eventSearchQuery.value) {
            const query = eventSearchQuery.value.toLowerCase();
            result = result.filter(e =>
                e.translated.en.name.toLowerCase().includes(query) ||
                e.translated.vi.name.toLowerCase().includes(query) ||
                e.code.toLowerCase().includes(query)
            );
        }
        if (selectedEventStatus.value) {
            result = result.filter(e => e.status === selectedEventStatus.value);
        }
        if (selectedEventType.value) {
            result = result.filter(e => e.type === selectedEventType.value);
        }
        return result;
    });

    const paginatedEvents = computed(() => {
        const start = (eventCurrentPage.value - 1) * eventsPerPage.value;
        return filteredEvents.value.slice(start, start + eventsPerPage.value);
    });

    const totalEventPages = computed(() => Math.ceil(filteredEvents.value.length / eventsPerPage.value));

    // --- Filtering and Pagination for Vouchers ---

    const filteredVouchers = computed(() => {
        let result = allVouchers.value;
        if (voucherSearchQuery.value) {
            const query = voucherSearchQuery.value.toLowerCase();
            result = result.filter(v =>
                v.code.toLowerCase().includes(query) ||
                v.translated.en.description.toLowerCase().includes(query) ||
                v.translated.vi.description.toLowerCase().includes(query)
            );
        }
        if (selectedVoucherStatus.value) {
            result = result.filter(v => v.status === selectedVoucherStatus.value);
        }
        if (selectedVoucherType.value) {
            result = result.filter(v => v.type === selectedVoucherType.value);
        }
        return result;
    });

    const paginatedVouchers = computed(() => {
        const start = (voucherCurrentPage.value - 1) * vouchersPerPage.value;
        return filteredVouchers.value.slice(start, start + vouchersPerPage.value);
    });

    const totalVoucherPages = computed(() => Math.ceil(filteredVouchers.value.length / vouchersPerPage.value));

    return {
        // Event State & Data
        eventSearchQuery,
        selectedEventStatus,
        selectedEventType,
        eventCurrentPage,
        eventsPerPage,
        filteredEvents,
        paginatedEvents,
        totalEventPages,

        // Voucher State & Data
        voucherSearchQuery,
        selectedVoucherStatus,
        selectedVoucherType,
        voucherCurrentPage,
        vouchersPerPage,
        filteredVouchers,
        paginatedVouchers,
        totalVoucherPages,
    };
}