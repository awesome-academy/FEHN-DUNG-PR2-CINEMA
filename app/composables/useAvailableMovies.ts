import { movies } from "~/data/sampleData";
import type { Movie } from "~~/types/type";

// Get all movies with status now_showing
export function useAvailableMovies() {
    const nowShowingMovies = movies.filter(m => m.status === "now_showing");
    return { movies: nowShowingMovies };
}
