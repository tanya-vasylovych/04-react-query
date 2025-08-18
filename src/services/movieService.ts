import axios from 'axios';
import type { Movie } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_KEY}`;
axios.defaults.params = {
  orientation: 'landscape',
};
interface TMDBResponse {
  results: Movie[];
  total_pages: number;
}
interface MovieResults {
  results: Movie[];
  totalPages: number;
}

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResults> => {
  const { data } = await axios.get<TMDBResponse>('search/movie', {
    params: { query, page },
  });
  return {
    results: data.results,
    totalPages: data.total_pages,
  };
};
