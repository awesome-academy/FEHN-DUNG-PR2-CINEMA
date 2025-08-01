import { computed } from "vue";
import { cinemas } from "~/data/sampleData";

export interface CinemaResult {
    id: number,
    name: string,
    description: string,
    address: string,
    city: string,
    mapUrl: string,
}

export function useCinemas(locale: any) {
    const cinemasList = computed<CinemaResult[]>(() =>
        cinemas.map((cinema) => {
            const translation = cinema.translations.find((t) => t.locale === locale.value) || cinema.translations[0];
            return {
                id: cinema.id,
                name: translation?.name ?? '',
                description: translation?.description ?? '',
                address: cinema.address,
                city: cinema.city,
                mapUrl: cinema.mapUrl
            }
        })
    );

    return {
        cinemas: cinemasList
    }
}