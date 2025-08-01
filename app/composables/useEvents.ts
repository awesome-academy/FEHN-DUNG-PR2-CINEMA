import { computed } from 'vue'
import { events, movies, cinemas } from '~/data/sampleData'
import type { MembershipTier, Cinema, Movie } from '~~/types/type';

export interface EventResult {
    id: number,
    code: string,
    name: string,
    description: string,
    terms: string
    type: string,
    startDate: string,
    endDate: string,
    status: string,
    image: string,
    applicableCinemas?: string[];
    applicableMovies?: string[];
    requiredTier?: MembershipTier;
}


export function useEvents(locale: any) {
    const eventsList = computed<EventResult[]>(() =>
        events.map((event) => {
            const translation = event.translations.find((t) => t.locale === locale.value) || event.translations[0];

            const applicableCinemaNames = event.applicableCinemas
                ? event.applicableCinemas
                    .map(id => {
                        const cinema = cinemas.find(c => c.id === id);
                        const trans = cinema?.translations.find(t => t.locale === locale.value) || cinema?.translations[0];
                        return trans?.name || '';
                    })
                    .filter(name => name)
                : [];

            const applicableMovieNames = event.applicableMovies
                ? event.applicableMovies
                    .map(id => {
                        const movie = movies.find(m => m.id === id);
                        const trans = movie?.translations.find(t => t.locale === locale.value) || movie?.translations[0];
                        return trans?.name || '';
                    })
                    .filter(name => name)
                : [];

            return {
                id: event.id,
                code: event.code,
                name: translation?.name ?? '',
                description: translation?.description ?? '',
                terms: translation?.terms ?? '',
                type: event.type,
                startDate: event.startDate,
                endDate: event.endDate,
                status: event.status,
                image: event.image,
                applicableCinemas: applicableCinemaNames,
                applicableMovies: applicableMovieNames,
                requiredTier: event.requiredTier
            }
        })
    )

    return { events: eventsList }
}
