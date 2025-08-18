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
import { useQuery } from '@tanstack/react-query';

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['movies', query],
    queryFn: () => fetchMovies(query),
    enabled: query !== '',
  });
  useEffect(() => {
    if (isSuccess && data.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data, isSuccess]);
  const onSubmit = async (value: string) => {
    setQuery(value);
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
      {isSuccess && data?.length > 0 && (
        <MovieGrid movies={data} onSelect={handleSelect} />
      )}
      {selectedMovie && <MovieModal onClose={onClose} movie={selectedMovie} />}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
