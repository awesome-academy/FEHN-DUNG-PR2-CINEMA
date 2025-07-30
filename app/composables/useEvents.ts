import { computed } from 'vue'
import { events } from '~/data/sampleData'

export function useEvents(locale: any) {
    const mappedEvents = computed(() =>
        events.map(event => {
            const translation =
                event.translations.find(t => t.locale === locale.value) ||
                event.translations[0] ||
                null
            return {
                ...event,
                translation
            }
        })
    )

    return { events: mappedEvents }
}
