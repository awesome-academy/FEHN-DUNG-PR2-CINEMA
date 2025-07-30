import { computed } from "vue";
import { genres as allGenres, movies } from "~/data/sampleData";

export function useMovieDetails(movieId: any, locale: any) {
    const detail = computed(() => {
        // Tránh lỗi null và undefined
        if (!movieId?.value) return null;
        const movie = movies.find((m) => m.id === movieId.value);
        if (!movie) return null;

        const translation = movie.translations.find((t) => t.locale === locale.value) || movie.translations[0];
        const genreNames = movie.genres.map((genreId) => {
            const genre = allGenres.find((g) => g.id === genreId);
            return genre
                ? genre.translations.find((t) => t.locale === locale.value)?.name || genre.translations[0]?.name
                : '';
        });

        return {
            id: movie.id,
            code: movie.code,
            name: translation?.name || '',
            brief: translation?.brief || '',
            description: translation?.description || '',
            genres: genreNames,
            duration: movie.duration,
            posterImg: movie.posterImg,
            trailer: movie.trailer,
            releaseDate: movie.releaseDate,
            status: movie.status,
            directors: movie.directors,
            casts: movie.casts,
            ratings: movie.ratings,
        };
    });

    return { detail };
}
