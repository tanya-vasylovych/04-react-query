// Функцію fetchMovies для виконання HTTP - запитів винесіть
//  в окремий файл src / services / movieService.ts.
//  Типізуйте її параметри, результат, який вона повертає,
//     та відповідь від Axios.

import axios from "axios";
import type { Movie } from "../types/movie";

const API_KEY = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3/";
axios.defaults.headers.common["Authorization"] = `Bearer ${API_KEY}`;
axios.defaults.params = {
  orientation: "landscape",
};
interface TMDBResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await axios.get<TMDBResponse>("search/movie", {
    params: { query },
  });
  return data.results;
};
