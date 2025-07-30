import { computed } from 'vue'
import type { Event, EventTranslation } from '~~/types/type'
import { events } from '~/data/sampleData'

export function useEventDetails(eventId: any, locale: any) {
    // computed trả về chi tiết sự kiện
    const detail = computed<Event | null>(() => {
        if (!eventId.value) return null
        const event = events.find(e => e.id === eventId.value)
        return event || null
    })

    // computed trả về translation đúng locale (fallback về 1st nếu không có)
    const translation = computed<EventTranslation | null>(() => {
        if (!detail.value) return null
        return (
            detail.value.translations.find(t => t.locale === locale.value)
            || detail.value.translations[0]
            || null
        )
    })

    return {
        detail,
        translation,
    }
}
