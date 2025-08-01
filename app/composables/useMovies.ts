import { computed } from "vue";
import { genres as allGenres, movies } from "~/data/sampleData";

export interface MovieResult {
    id: number;
    code: string;
    name: string;
    brief: string;
    description: string;
    genres: string[];
    duration: number;
    posterImg: string;
    trailer: string;
    releaseDate: string;
    status: 'coming_soon' | 'now_showing' | 'ended';
    directors: string[];
    casts: string[];
    ratings: number[];
}

export function useMovies(locale: any) {
    const movieList = computed<MovieResult[]>(() =>
        movies.map((movie) => {
            const translation =
                movie.translations.find((t) => t.locale === locale.value) ||
                movie.translations[0];
            const genreNames = movie.genres.map((genreId) => {
                const genre = allGenres.find((g) => g.id === genreId);
                return genre
                    ? genre.translations.find((t) => t.locale === locale.value)?.name
                    || genre.translations[0]?.name
                    || "Unknown Genre"
                    : "Unknown Genre";
            });


            return {
                id: movie.id,
                code: movie.code,
                name: translation?.name || "",
                brief: translation?.brief || "",
                description: translation?.description || "",
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
        })
    );

    return { movies: movieList };
}