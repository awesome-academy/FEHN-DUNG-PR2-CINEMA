import { computed, ref } from 'vue';
import { fnbItems } from '~/data/sampleData';
import type { FnbItem } from '~~/types/type';

// Helper to get bilingual translations
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

export function useAdminManageFnbs() {
    // --- State for F&B Management ---
    const searchQuery = ref('');
    const selectedType = ref('');
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // --- Base Computed Properties ---

    const allFnbs = computed(() => {
        return fnbItems.map(item => ({
            ...item,
            translatedName: getTranslations(item),
        }));
    });

    const availableFnbTypes = computed(() => {
        const types = new Set(fnbItems.map(item => item.type));
        return Array.from(types);
    });

    // --- Filtering and Pagination Logic ---

    const filteredFnbs = computed(() => {
        let result = allFnbs.value;

        // Apply search filter
        if (searchQuery.value) {
            const query = searchQuery.value.toLowerCase();
            result = result.filter(item =>
                item.translatedName.en.toLowerCase().includes(query) ||
                item.translatedName.vi.toLowerCase().includes(query) ||
                item.code.toLowerCase().includes(query)
            );
        }

        // Apply type filter
        if (selectedType.value) {
            result = result.filter(item => item.type === selectedType.value);
        }

        return result;
    });

    const totalPages = computed(() => {
        return Math.ceil(filteredFnbs.value.length / itemsPerPage.value);
    });

    const paginatedFnbs = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return filteredFnbs.value.slice(start, end);
    });

    return {
        // State
        searchQuery,
        selectedType,
        currentPage,
        itemsPerPage,

        // Computed Data
        filteredFnbs,
        paginatedFnbs,
        totalPages,
        availableFnbTypes,
    };
}