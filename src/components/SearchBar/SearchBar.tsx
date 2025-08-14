import { toast, Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleSubmit = (formData: FormData) => {
    const value = formData.get('query') as string;
    if (value.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }
    onSubmit(value);
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </header>
  );
};

export default SearchBar;
