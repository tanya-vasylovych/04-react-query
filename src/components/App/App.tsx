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
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

function App() {
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (isSuccess && data?.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data, isSuccess]);
  const onSubmit = async (value: string) => {
    setQuery(value);
    setPage(1);
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
      {isSuccess && data?.totalPages > 1 && (
        <ReactPaginate
          pageCount={data.totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {isSuccess && data?.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleSelect} />
      )}
      {selectedMovie && <MovieModal onClose={onClose} movie={selectedMovie} />}
      {isLoading && query !== '' && <Loader />}
      {isError && query !== '' && <ErrorMessage />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
