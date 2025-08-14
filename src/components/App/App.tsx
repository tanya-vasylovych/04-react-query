import { useEffect, useState } from 'react';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import css from './App.module.css';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import { toast, Toaster } from 'react-hot-toast';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (isEmpty) {
      toast.error('No movies found for your request.');
    }
  }, [isEmpty]);
  const onSubmit = async (value: string) => {
    setIsEmpty(false);
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await fetchMovies(value);
      if (!data.length) {
        setIsEmpty(true);
        return;
      }
      setMovies(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const onClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={onSubmit} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      <Toaster position="top-center" reverseOrder={false} />
      {isError && <ErrorMessage />}
      {selectedMovie && <MovieModal onClose={onClose} movie={selectedMovie} />}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
